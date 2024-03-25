import React, { useEffect, useState } from "react";
import { Field, Label, Select, Input } from "@zendeskgarden/react-forms";
import CustomButton from "./customButton";
import styled from "styled-components";
import CustomNotification from "./customNotification";
import { useToast } from "@zendeskgarden/react-notifications";
import { updateShipmentAddress } from "../api/api";

const StyledField = styled(Field)`
    margin: 10px 0;
`;

const EditShipmentAddressForm = ({ formData, closeModal, onSuccess }) => {

    const { addToast } = useToast();

    const [data, setData] = useState({
        id: '',
        email: '',
        firstName: '',
        middleNameOrInitial: '',
        lastNameOrSurname: '',
        companyOrOrganization: '',
        isValidated: false,
        isDestinationCommercial: false,
        shippingMethodCode: '',
        shippingMethodName: '',
        siteId: '',
        orderId: '',

        addressType: null,
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        cityOrTown: "",
        stateOrProvince: "",
        postalOrZipCode: "",
        countryCode: null,
        homePhone: "",
        workPhone: "",
        mobilePhone: ""
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        populateDetails();
    }, []);

    const populateDetails = () => {
        setData({
            id: formData.id,
            email: formData.email,
            firstName: formData.firstName,
            middleNameOrInitial: formData.middleNameOrInitial,
            lastNameOrSurname: formData.lastNameOrSurname,
            companyOrOrganization: formData.companyOrOrganization,
            isValidated: false,
            isDestinationCommercial: formData.isDestinationCommercial,
            shippingMethodCode: formData.shippingMethodCode,
            shippingMethodName: formData.shippingMethodName,
            siteId: formData.siteId,
            orderId: formData.orderId,

            addressType: formData.address?.addressType,
            address1: formData.address?.address1,
            address2: formData.address?.address2,
            address3: formData.address?.address3,
            address4: formData.address?.address4,
            cityOrTown: formData.address?.cityOrTown,
            stateOrProvince: formData.address?.stateOrProvince,
            postalOrZipCode: parseInt(formData.address?.postalOrZipCode || ''),
            countryCode: formData.address?.countryCode,
            homePhone: parseInt(formData.phoneNumbers?.home || ''),
            workPhone: parseInt(formData.phoneNumbers?.work || ''),
            mobilePhone: parseInt(formData.phoneNumbers?.mobile || ''),

        })
    };

    const isFormValid = () => {
        const requiredFields = [
            "address1", "cityOrTown", "stateOrProvince", "postalOrZipCode", "countryCode", "homePhone"
        ];
        return requiredFields.every((el) => !!data[el]);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (isFormValid()) {
            setSubmitting(true);
            try {
                const updatedData = getUpdatedData();
                await updateShipmentAddress(updatedData);
                addToast(CustomNotification({
                    content: 'Successfully updated shipment address'
                }))
                onSuccess();
            } catch (err) {
                addToast(CustomNotification({
                    content: 'Failed to update shipment address',
                    type: 'error'
                }))
            }
            setSubmitting(false);
            closeModal()
        }
    };

    const getUpdatedData = () => {
        return ({
            id: data.id,
            email: data.email || '',
            firstName: data.firstName || '',
            middleNameOrInitial: data.middleNameOrInitial || '',
            lastNameOrSurname: data.lastNameOrSurname || '',
            companyOrOrganization: data.companyOrOrganization || '',
            phoneNumbers: {
                home: (parseInt(data.homePhone || '') || '').toString(),
                work: (parseInt(data.workPhone || '') || '').toString(),
                mobile: (parseInt(data.mobilePhone || '') || '').toString(),
            },
            address: {
                addressType: data.addressType,
                address1: data.address1 || '',
                address2: data.address2 || '',
                address3: data.address3 || '',
                address4: data.address4 || '',
                cityOrTown: data.cityOrTown,
                stateOrProvince: data.stateOrProvince,
                postalOrZipCode: (parseInt(data.postalOrZipCode || '') || '').toString(),
                countryCode: data.countryCode,
                isValidated: false,
            },
            isDestinationCommercial: data.addressType === 'Commercial',
            shippingMethodCode: data.shippingMethodCode,
            shippingMethodName: data.shippingMethodName,
            siteId: data.siteId,
            orderId: data.orderId
        })
    }

    const addressTypes = [
        { label: 'Commercial', value: 'Commercial' },
        { label: 'Residential', value: 'Residential' },
    ];

    const countryCode = [
        { label: "Canada", value: "CA" },
        { label: "United States", value: "US" },
        { label: "United Kingdom", value: "GB" },
        { label: "India", value: "IN" },
    ]

    const handleChange = ({ target: { name, value } }) => {
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <StyledField>
                <Label>Address Type</Label>
                <Select name="addressType" value={data.addressType || ''} onChange={handleChange}>
                    <option value='' disabled>Select address type</option>
                    {addressTypes.map((el, index) => (
                        <option key={index} value={el.value}>{el.label}</option>
                    ))}
                </Select>
            </StyledField>
            <StyledField>
                <Label aria-required="true">Address 1 *</Label>
                <Input name="address1" value={data.address1} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label>Address 2</Label>
                <Input name="address2" value={data.address2} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label>Address 3</Label>
                <Input name="address3" value={data.address3} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label>Address 4</Label>
                <Input name="address4" value={data.address4} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label aria-required="true">City *</Label>
                <Input name="cityOrTown" value={data.cityOrTown} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label aria-required="true">State *</Label>
                <Input name="stateOrProvince" value={data.stateOrProvince} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label aria-required="true">ZIP *</Label>
                <Input name="postalOrZipCode" type="number" value={data.postalOrZipCode} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label aria-required="true">Country *</Label>
                <Select name="countryCode" value={data.countryCode || ''} onChange={handleChange}>
                    <option value="" disabled>Select Country</option>
                    {
                        countryCode.map((el, index) => <option key={index} value={el.value}>
                            {el.label}
                        </option>)
                    }
                </Select>
            </StyledField>
            <StyledField>
                <Label aria-required="true">Home Phone *</Label>
                <Input name="homePhone" type="number" value={data.homePhone} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label>Work Phone</Label>
                <Input name="workPhone" type="number" value={data.workPhone} onChange={handleChange} />
            </StyledField>
            <StyledField>
                <Label>Mobile Phone</Label>
                <Input name="mobilePhone" type="number" value={data.mobilePhone} onChange={handleChange} />
            </StyledField>
            <CustomButton loading={submitting} disabled={!isFormValid()} type='submit'>
                Update Address
            </CustomButton>
        </form>
    )
};

export default EditShipmentAddressForm;
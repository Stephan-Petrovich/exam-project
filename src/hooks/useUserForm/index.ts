import { validateName, validateDate } from "../../utils/validations";
import { capitalizeText } from "../../utils/functions";
import { useEffect, useState } from "react";

export interface IUserData {
    name: string;
    surname: string;
    patronymic: string;
    dateOfBth: string;
    gender: boolean;
}

interface IUseUserFormReturn {
    userData: IUserData;
    errors: Record<string, string>;
    isValid: boolean;
    updateField: (field: keyof IUserData, value: string | boolean) => void;
    checkIsFieldValid: (field: keyof IUserData, value: string) => boolean;
    resetAllFields: () => void;
}

export const useUserForm = (): IUseUserFormReturn => {
    const [userData, setUserData] = useState<IUserData>({
        name: "",
        surname: "",
        patronymic: "",
        dateOfBth: "",
        gender: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const saved = localStorage.getItem("userData");

        if (saved) {
            setUserData(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    useEffect(() => {
        const isFormValid = () => {
            return (
                validateName(userData.name) &&
                validateName(userData.surname) &&
                validateName(userData.patronymic) &&
                validateDate(userData.dateOfBth)
            );
        };

        setIsValid(isFormValid);
    }, [userData]);

    const checkIsFieldValid = (
        field: keyof IUserData,
        value: string
    ): boolean => {
        const validators: Record<keyof IUserData, (value: string) => boolean> =
            {
                name: validateName,
                surname: validateName,
                patronymic: validateName,
                dateOfBth: validateDate,
                gender: () => true,
            };

        return validators[field](value);
    };

    const getErrorMessage = (field: keyof IUserData): string => {
        const errorMessages: Record<keyof IUserData, string> = {
            name: "Only letters, spaces, hyphens and apostrophes allowed. Minimum 2 characters.",
            surname:
                "Only letters, spaces, hyphens and apostrophes allowed. Minimum 2 characters.",
            patronymic:
                "Only letters, spaces, hyphens and apostrophes allowed. Minimum 2 characters.",
            dateOfBth: "Please enter a valid date in format DD.MM.YYYY",
            gender: "",
        };

        return errorMessages[field];
    };

    const updateField = (field: keyof IUserData, value: string | boolean) => {
        let passedValue = value;

        if (
            typeof value === "string" &&
            (field === "name" || field === "surname" || field === "patronymic")
        ) {
            passedValue = capitalizeText(value);
        }

        if (field === "dateOfBth" && typeof value === "string") {
            let formattedDate = value.replace(/[^\d.]/g, "");

            if (value.length === 2 || value.length === 5) {
                formattedDate = value + ".";
            }

            if (formattedDate.length <= 10) {
                setUserData((prev) => ({ ...prev, dateOfBth: formattedDate }));
            }

            passedValue = formattedDate;
        }

        setUserData((prev) => ({ ...prev, [field]: passedValue }));

        if (typeof passedValue === "string") {
            const fieldIsValid = checkIsFieldValid(field, passedValue);

            setErrors((prev) => ({
                ...prev,
                [field]: fieldIsValid ? "" : getErrorMessage(field),
            }));
        }
    };

    const resetAllFields = () => {
        setUserData({
            name: "",
            surname: "",
            patronymic: "",
            dateOfBth: "",
            gender: false,
        });
    };

    return {
        userData,
        errors,
        isValid,
        updateField,
        checkIsFieldValid,
        resetAllFields,
    };
};

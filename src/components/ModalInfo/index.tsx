import Toggle from "../Toggle";
import Input, { InputSizes, TypesOfInput } from "../Input";
import { useUserForm } from "../../hooks/useUserForm";
import { useEffect, type ReactElement } from "react";
import "./style.css";

interface IModalInfoProps {
    handleCheckIsValid: (isValid: boolean) => void;
}

const ModalInfo = ({ handleCheckIsValid }: IModalInfoProps): ReactElement => {
    const { userData, isValid, errors, updateField } = useUserForm();

    useEffect(() => {
        handleCheckIsValid(isValid);
    }, [userData]);

    const handleTextChange =
        (field: "name" | "surname" | "patronymic") => (value: string) => {
            updateField(field, value);
        };

    const handleDateChange = (value: string) => updateField("dateOfBth", value);
    const handleGenderChange = (value: boolean) => updateField("gender", value);

    return (
        <div className="modal-info-block">
            <form className="modal-info-form">
                <div className="form-group">
                    <Input
                        type="text"
                        value={userData.surname}
                        onChange={handleTextChange("surname")}
                        variant={TypesOfInput.SECONDARY}
                        size={InputSizes.MEDIUM}
                        placeholder="Enter your surname"
                        required
                    />
                    {errors.surname && (
                        <div className="alert-error">{errors.surname}</div>
                    )}
                </div>

                <div className="form-group">
                    <Input
                        type="text"
                        value={userData.name}
                        onChange={handleTextChange("name")}
                        variant={TypesOfInput.SECONDARY}
                        size={InputSizes.MEDIUM}
                        placeholder="Enter your name"
                        autoFocus
                        required
                    />
                    {errors.name && (
                        <div className="alert-error">{errors.name}</div>
                    )}
                </div>

                <div className="form-group">
                    <Input
                        type="text"
                        value={userData.patronymic}
                        onChange={handleTextChange("patronymic")}
                        variant={TypesOfInput.SECONDARY}
                        size={InputSizes.MEDIUM}
                        placeholder="Enter your patronymic"
                        required
                    />
                    {errors.patronymic && (
                        <div className="alert-error">{errors.patronymic}</div>
                    )}
                </div>

                <div className="form-group">
                    <Input
                        type="text"
                        value={userData.dateOfBth}
                        onChange={handleDateChange}
                        variant={TypesOfInput.SECONDARY}
                        size={InputSizes.SMALL}
                        placeholder="DD.MM.YYYY"
                        required
                    />
                    {errors.dateOfBth && (
                        <div className="alert-error">{errors.dateOfBth}</div>
                    )}
                </div>

                <div className="form-group">
                    <label className="gender-label">Choose your gender</label>
                    <Toggle
                        value={userData.gender}
                        onChange={handleGenderChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default ModalInfo;

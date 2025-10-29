import Toggle from "../Toggle";
import AlertError from "../AlertError";
import Input, { InputSizes, TypesOfInput } from "../Input";
import { useUserData } from "../../contexts/UserDataContext";
import { type ReactElement } from "react";
import "./style.css";

const ModalInfo = (): ReactElement => {
    const { userData, updateField, errors } = useUserData();

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
                    {errors.surname && <AlertError label={errors.surname} />}
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
                    {errors.name && <AlertError label={errors.name} />}
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
                        <AlertError label={errors.patronymic} />
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
                        <AlertError label={errors.dateOfBth} />
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

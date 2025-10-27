import Toggle from "../Toggle";
import Input, { InputSizes, TypesOfInput } from "../Input";
import { validateName, validateDate } from "../../utils/validations";
import { useEffect, useState, type ReactElement } from "react";
import { capitalizeText } from "../../utils/functions";
import "./style.css";

interface IModalInfoProps {
    handleCheckIsValid: (isValid: boolean) => void;
}

const ModalInfo = ({ handleCheckIsValid }: IModalInfoProps): ReactElement => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [patronymic, setPatronymic] = useState<string>("");
    const [dateOfBth, setDateOfBth] = useState<string>("");
    const [gender, setGender] = useState<boolean>(true);

    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        patronymic: "",
        dateOfBth: "",
    });

    const getIsDataValid = (): boolean => {
        return (
            validateName(name),
            validateName(surname),
            validateName(patronymic),
            validateDate(dateOfBth)
        );
    };

    useEffect(() => {
        handleCheckIsValid(getIsDataValid());
    }, [name, surname, patronymic, dateOfBth]);

    const handleNameChange = (changedName: string) => {
        const capitalized = capitalizeText(changedName);

        setName(capitalized);

        if (validateName(name) == false) {
            setErrors((prev) => ({
                ...prev,
                name: "Only letters, spaces, hyphens and apostrophes allowed. Minimum 2 characters.",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                name: "",
            }));
        }
    };

    const handleSurnameChange = (changedSurname: string) => {
        const capitalized = capitalizeText(changedSurname);

        setSurname(capitalized);

        if (validateName(surname) == false) {
            setErrors((prev) => ({
                ...prev,
                surname:
                    "Only letters, spaces, hyphens and apostrophes allowed. Minimum 2 characters.",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                surname: "",
            }));
        }
    };

    const handlePatronymicChange = (changedPatronymic: string) => {
        const capitalized = capitalizeText(changedPatronymic);

        setPatronymic(capitalized);

        if (validateName(patronymic) == false) {
            setErrors((prev) => ({
                ...prev,
                patronymic:
                    "Only letters, spaces, hyphens and apostrophes allowed. Minimum 2 characters.",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                patronymic: "",
            }));
        }
    };

    const handleDateOfBthChange = (changedDateOfBth: string) => {
        let formattedDate = changedDateOfBth;

        if (changedDateOfBth.length === 2 || changedDateOfBth.length === 5) {
            formattedDate = changedDateOfBth + ".";
        }

        if (formattedDate.length <= 10) {
            setDateOfBth(formattedDate);
        }

        if (validateDate(dateOfBth) == false) {
            setErrors((prev) => ({
                ...prev,
                dateOfBth: "Please enter a valid date in format DD.MM.YYYY",
            }));
        }
    };

    const handleChooseGender = (choosedGender: boolean) => {
        setGender(choosedGender);
    };

    return (
        <div className="modal-info-block">
            <form className="modal-info-form">
                <div className="form-group">
                    <Input
                        type="text"
                        value={surname}
                        onChange={handleSurnameChange}
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
                        value={name}
                        onChange={handleNameChange}
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
                        value={patronymic}
                        onChange={handlePatronymicChange}
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
                        value={dateOfBth}
                        onChange={handleDateOfBthChange}
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
                    <Toggle value={gender} onChange={handleChooseGender} />
                </div>
            </form>
        </div>
    );
};

export default ModalInfo;

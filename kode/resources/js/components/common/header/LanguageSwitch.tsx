import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LuLanguages } from 'react-icons/lu';

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "bn", name: "Bangla", flag: "🇧🇩" },
];


const LanguageSwitch = () => {
    const { i18n, t } = useTranslation();

    const handleLanguageSwitch = (languageCode) => {
        i18n.changeLanguage(languageCode);
    };

    return (
        <Dropdown className="icon-dropdown">
            <Dropdown.Toggle className="transparent-dropdown">
                <div className="header-action fs-16 text-uppercase">
                    {languages.find((lang) => lang.code === i18n.language)
                        ?.code || "en"}
                </div>
            </Dropdown.Toggle>

            {languages?.length > 0 && (
                <Dropdown.Menu>
                        <ul className="dropdown-content language">
                            {languages?.map((language, index) => (
                                <li className="p-0" key={index}>
                                    <Dropdown.Item
                                        as="button"
                                        onClick={() =>
                                            handleLanguageSwitch(language.code)
                                        }
                                    >
                                        <LuLanguages />
                                        {language?.name}
                                    </Dropdown.Item>
                                </li>
                            ))}
                        </ul>
                </Dropdown.Menu>
            )}
        </Dropdown>
    );
}

export default LanguageSwitch;
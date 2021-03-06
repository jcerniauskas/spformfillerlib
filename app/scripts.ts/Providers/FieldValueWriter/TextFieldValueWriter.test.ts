import TestContainer from "../../test/inversify.config";
import { IFieldValueWriter } from "./IFieldValueWriter";
import { TextFieldValueWriter } from "./TextFieldValueWriter";
import { IFieldInfo, ITextFieldInfo } from "../../FieldInfo/IFieldInfo";

describe("TextFieldValueWriter", () => {
    TestContainer.snapshot();

    const textFieldValueWriter = TestContainer.bindAndGetSpecificInstance<IFieldValueWriter>("IFieldValueWriter", TextFieldValueWriter);

    it("should fill Title input with a specified value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithTextInputField.html");
        const titleFieldInfo = <ITextFieldInfo> {
                        InternalName: "Title",
                        Title: "Title",
                        Id: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
                        Hidden: false
                    };

        const testValue = "This is a test value";
        textFieldValueWriter.WriteValue(titleFieldInfo, testValue);
        expect($("[id='Title_fa564e0f-0c70-4ab9-b863-0177e6ddd247_$TextField']")).toHaveValue(testValue);
    });
    
    afterAll(() => {
        TestContainer.restore();
    });
});
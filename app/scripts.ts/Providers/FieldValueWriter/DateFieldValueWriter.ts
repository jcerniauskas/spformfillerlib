import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo, IDateFieldInfo, DateFormat } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";

// this class writes a value to a date field
@injectable()
export class DateFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IDateFieldInfo, value: any): void {
        const dateInputField = super.GetInputControlForField(fieldInfo, "input", "$DateTimeFieldDate");

        const dateValue = <Date>value;
        // TODO: test for regional settings effect
        const formattedValue = `${dateValue.getMonth() + 1}/${dateValue.getDate()}/${dateValue.getFullYear()}`;
        dateInputField.val(formattedValue);

        // check if this is a Date + Time field
        if (fieldInfo.DateFormat === DateFormat.DateAndTime) {
            // in this case we must also update the hour and minute values
            const hourSelectField = super.GetInputControlForField(fieldInfo, "select", "$DateTimeFieldDateHours");
            // TODO: test for regional settings effect
            hourSelectField.val(dateValue.getHours());

            const minutesSelectField = super.GetInputControlForField(fieldInfo, "select", "$DateTimeFieldDateMinutes");
            minutesSelectField.val(DateFieldValueWriter.PadZero(dateValue.getMinutes()));
        }
    }

    // Pads a zero in front of a numbers string representation if it's below 10
    private static PadZero(numberToPad: number): string {
        return (numberToPad < 10) ? ("0" + numberToPad) : numberToPad.toString();
    }
}
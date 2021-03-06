import { IContentTypeDeterminer, IContentTypeInformation } from "./IContentTypeInfo";
import { injectable, inject } from "inversify";

// this IContentTypeDeterminer will return a selected content type from the form's ContentTypeChoice field, if one is present
@injectable()
export class PageContentTypeDeterminerByField implements IContentTypeDeterminer {
    public GetContentTypeInformation(): Promise<IContentTypeInformation> {
        // we search for field which has the id ending with "ContentTypeChoice" - this is a special field in SharePoint 2013
        const contentTypeField = $("select[id$='ContentTypeChoice']");
        if (contentTypeField && contentTypeField.length > 0) {
            // check for the selected option
            const selectedOption = contentTypeField.find("option:selected");
            if (selectedOption && selectedOption.length > 0) {
                return Promise.resolve<IContentTypeInformation>({
                    // id will be in the "value" attribute
                    ContentTypeId: selectedOption.attr("value"),
                });
            }
        }
    }
}
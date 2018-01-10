import fs = require('fs');
import Config from "./Config";
import ParseSheetData from "./ParseSheetData";
export default class TsDefineExporter {
    
    public static export(fileName: string) {

        let headers = ParseSheetData.headers;
        let types = ParseSheetData.types;
        let annotations = ParseSheetData.annotations;

        let field = ``;
        for(let i = 0, len = headers.length; i < len; i++) {
            field += this.getField(headers[i], types[i], annotations[i]);
        }

        let outputFilename = Config.TS_FILE_PATH + fileName + '.ts';
        let tsTemplate = `class ${fileName} {${field}\n}`
        this.saveToFile(outputFilename, tsTemplate);
    }
    private static saveToFile(filePath, data: string) {
        fs.writeFile(filePath, data, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + filePath);
            }
        });
    }
    private static getField(header, type, annotation) {
        return `\n    /** ${annotation} */\n    public ${header}: ${type}; `;
    }
}

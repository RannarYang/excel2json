import xlsx = require("xlsx");
import fs = require('fs');
import Config from "./Config";
import ParseSheetData from "./ParseSheetData";
export default class JsonExporter {
    
    public static export(fileName: string) {

        var myData = [];
        let headers = ParseSheetData.headers;
        let types = ParseSheetData.types;
        let datas = ParseSheetData.datas;

        for(let line = 0, dataLen = datas.length; line < dataLen; line++) {
            let data = datas[line];
            let obj: any = {};
            for(let col = 0, len = data.length; col < len; col++) {
                obj[headers[col]] = data[col];
            }
            myData.push(obj);
        }

        let outputFilename = Config.JSON_FILE_PATH + fileName + '.json';
        this.saveToFile(outputFilename, myData);
    }
    private static saveToFile(filePath, data: Object) {
        fs.writeFile(filePath, JSON.stringify(data, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Ts saved to " + filePath);
            }
        });
    }
}

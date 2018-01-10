import nodexlsx = require("node-xlsx");
import xmlreader = require("xmlreader");
import xml2js = require('xml2js');
import fs = require("fs");
import JsonExporter from "./JsonExporter";
import ParseSheet from "./ParseSheet";
import Config from "./Config";
import ParseSheetData from "./ParseSheetData";
import TsDefineExporter from "./TsDefineExporter";
class Program {
    constructor() {
        this.runAll();
    }
    private runAll() {
        this.clearFolder(Config.JSON_FILE_PATH);
        this.clearFolder(Config.TS_FILE_PATH);
        this.travel(Config.XLS_FILE_PATH, this.runXlsx);
    }
    private runXlsx(file) {
        // 获取数据 ============================================
        let xlsdata = nodexlsx.parse(Config.XLS_FILE_PATH + file)[0];
        ParseSheetData.parse(xlsdata.data);

        let fileName = file.split('.')[0];
        // 导出json文件 ============================================
        JsonExporter.export(fileName);

        // 导出typescript文件 ============================================
        TsDefineExporter.export(fileName);
    }
    /**遍历文件 */
    private travel(src, callback) {
        let self = this;
        // 读取目录
        fs.readdir(src, (err, paths) => {
            if(err) throw err;
            paths.forEach(function(path){
                let _src=src + path;
                
                fs.stat(_src,function(err,st){
                    if(err){
                        throw err;
                    }
                    
                    if(st.isFile()){
                        // 不处理临时文件
                        if(path.indexOf('~$') != 0) {
                            callback(path);
                        }
                    }else if(st.isDirectory()){
                        self.travel(_src, callback);
                    }
                });
            });
        });

    }
    // 清空文件夹
    private clearFolder(path) {
        let files = [];
        let self = this;
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                let curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    self.clearFolder(curPath);
                    fs.rmdirSync(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            
        }
    }
}
new Program();
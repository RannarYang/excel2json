import xlsx = require("xlsx");
export default class ParseSheet {
    private static sheet: xlsx.IWorkSheet;
    private static prop: xlsx.IProperties;

    private static headerLine: number = 1;
    private static typeLine: number = 2;
    private static annotationLine: number = 3;
    // private static dataStartLine: number = 4;

    private static lineStart: number;
    private static lineEnd: number;
    private static colStart: string;
    private static colEnd: string;
    private static colStartCode: number;
    private static colEndCode: number;

    /**表头信息 */
    public static headers: string[] = [];
    /**类型信息 */
    public static types: string[] = [];
    /**注释信息 */
    public static annotations: string[] = [];
    /**主体信息 */
    public static datas = [];
 
    public static parse(sheet: xlsx.IWorkSheet) {
        this.sheet = sheet;
        let ref = sheet['!ref'].split(':');
        let ceelFirst = ref[0].split('');
        let ceelEnd = ref[1].split('');
        
        this.lineStart = parseInt(ceelFirst[1]);
        this.lineEnd = parseInt(ceelEnd[1]);
        this.colStart = ceelFirst[0];
        this.colEnd = ceelEnd[0];
        this.colStartCode = this.colStart.charCodeAt(0);
        this.colEndCode = this.colEnd.charCodeAt(0);
        
        this.setTop(TopType.HEADERS);
        this.setTop(TopType.TYPES);
        this.setTop(TopType.ANNOTATION);
        this.setDatas()
    }

    private static setTop(type: TopType) {
        let beSetArr, beSetLine: number;
        switch(type) {
            case TopType.HEADERS:
                beSetArr = this.headers = [];
                beSetLine = this.headerLine;
                break;
            case TopType.TYPES:
                beSetArr = this.types = [];
                beSetLine = this.typeLine;
                break;
            case TopType.ANNOTATION:
                beSetArr = this.annotations = [];
                beSetLine = this.annotationLine;
                break;
        }

        let {sheet, colStartCode, colEndCode, } = this;
        let cellName: string;
        let cell: xlsx.IWorkSheetCell;
        let col: string;
        for(let i = colStartCode; i <= colEndCode; i++) {
            col = String.fromCharCode(i);
            cellName = col + beSetLine;
            cell = sheet[cellName];
            beSetArr.push(cell.v);
        }
    }

    private static setDatas() {
        
    }
}

enum TopType{
    HEADERS,
    TYPES,
    ANNOTATION
}
export default class ParseSheetData {
    
    private static headerLine: number = 0;
    private static typeLine: number = 1;
    private static annotationLine: number = 2;
    
    /**表头信息 */
    public static headers: string[] = [];
    /**类型信息 */
    public static types: string[] = [];
    /**注释信息 */
    public static annotations: string[] = [];
    /**主体信息 */
    public static datas = [];
 
    public static parse(data: any[]) {
        this.headers = data[this.headerLine];
        this.types = data[this.typeLine];
        this.annotations = data[this.annotationLine];
        this.datas = data.splice(3);
    }
}

enum TopType{
    HEADERS,
    TYPES,
    ANNOTATION
}
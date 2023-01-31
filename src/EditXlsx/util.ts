// import ExcelJS from 'exceljs';

const ExcelJS = require('exceljs');
const COLUMNS = [
    {
        header: '序号',
        key: 'idx',
        width: 8,
    },
    {
        header: '点位名',
        key: 'name',
        width: 10,
    },
    {
        header: '点位类型',
        key: 'pointType',
        width: 7,
    },
    {
        header: '寄存器类型',
        key: 'registerType',
        width: 30,
    },
    {
        header: '线性转换-比率',
        key: 'convertRatio',
        width: 12,
    },
    {
        header: '线性转换-基准',
        key: 'convertBenchmark',
        width: 12,
    },
    {
        header: '地址',
        key: 'address',
        width: 10,
    },
    {
        header: '数据类型',
        key: 'dataType',
        width: 10,
    },
    {
        header: '点位说明',
        key: 'explain',
        width: 20,
    },
]
const filterIndex = (list,data)=>{
    return list.indexOf(data);
}
const _DATA = {
    pointTypeList: ['DI', 'DO', 'AI', 'AO'],
    registerTypeList: [
        'DI/1X-Input Status(02)',
        'AI/3X-Input Register(04)',
        'DO/0X-Coil Status(01，05)',
        'DO/0X-Coil Status(01，15)',
        'AO/4X-Holding Register(03，06)',
        'AO/4X-Holding Register(03，16)',
    ],
    dataTypeList: [
        'Boolean',
        'Short',
        'Float',
        'Word',
        'Dword',
        'Long',
        'Double',
    ]
}
//导入数据进行处理
export const analysisXlsx = async (file) => {
    try{
        let _data = [];
        const workbook = new ExcelJS.Workbook();
        const result = await workbook.xlsx.load(file.buffer);
        const sheets = result.getWorksheet();
        sheets.eachRow(function(row,idx) {
            if(idx >1){
                _data.push({
                    name:row.getCell(2).value,
                    pointType:filterIndex(_DATA.pointTypeList,row.getCell(3).value),
                    registerType:filterIndex(_DATA.registerTypeList,row.getCell(4).value),
                    convertRatio:row.getCell(5).value,
                    convertBenchmark:row.getCell(6).value,
                    address:row.getCell(7).value,
                    dataType:filterIndex(_DATA.dataTypeList,row.getCell(8).value),
                    explain:row.getCell(9).value,
                })
            }
        });
        return _data;
    }catch(err){
        return err;
    }
    
}

//导出成excel
export const createXlsx = async (list) => {
    const wb = new ExcelJS.Workbook();
    const sheets = wb.addWorksheet('sheets');
    sheets.columns = COLUMNS;
    list.map((item, idx) => {
        sheets.addRow([
            idx+1,
            item['name'],
            _DATA.pointTypeList[Number(item['pointType']) - 1],
            _DATA.registerTypeList[Number(item['registerType']) - 1],
            item['convertRatio'],
            item['convertBenchmark'],
            item['address'],
            _DATA.dataTypeList[Number(item['dataType']) - 1],
            item['explain'],
        ], 5);
        sheets.getCell(`B${2 + idx}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: ['"' +
                _DATA.pointTypeList.toString()
                + '"']
        };
        sheets.getCell(`C${2 + idx}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: ['"' +
                _DATA.registerTypeList.toString()
                + '"']
        };
        sheets.getCell(`G${2 + idx}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: ['"' +
                _DATA.dataTypeList.toString()
                + '"']
        };
    })
    const buffer = await wb.xlsx.writeBuffer();
    return buffer;
}


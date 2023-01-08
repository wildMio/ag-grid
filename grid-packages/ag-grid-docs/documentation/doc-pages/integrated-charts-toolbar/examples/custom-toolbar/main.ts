import {
    ChartMenuOptions,
    ColDef,
    CreateRangeChartParams,
    FirstDataRenderedEvent,
    Grid,
    GridOptions
} from '@ag-grid-community/core';
import { getData } from "./data";

const columnDefs: ColDef[] = [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
]

const gridOptions: GridOptions = {
    defaultColDef: {
        flex: 1,
    },
    columnDefs: columnDefs,
    rowData: getData(),
    onFirstDataRendered: onFirstDataRendered,
    enableRangeSelection: true,
    enableCharts: true,
    getChartToolbarItems: getChartToolbarItems,
    chartThemeOverrides: {
        pie: {
            title: {
                enabled: true,
                text: 'Precious Metals Production',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'rgb(100, 100, 100)',
            },
            subtitle: {
                enabled: true,
                text: 'by country',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fontSize: 14,
                color: 'rgb(100, 100, 100)',
            },
            padding: {
                top: 25,
                right: 20,
                bottom: 55,
                left: 20,
            },
            legend: {
                enabled: false,
            },
            series: {
                calloutLabel: {
                    enabled: true,
                },
                calloutLine: {
                    length: 20,
                },
            },
        },
    },
}

function getChartToolbarItems(): ChartMenuOptions[] {
    return ['chartDownload']
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
    var createRangeChartParams: CreateRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 5,
            columns: ['country', 'gold'],
        },
        chartType: 'pie',
    }

    params.api.createRangeChart(createRangeChartParams)
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
    new Grid(gridDiv, gridOptions)
})

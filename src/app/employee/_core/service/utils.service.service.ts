import { Injectable, ElementRef } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
// import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
// import { FormModel } from '../models/form.model';
// import * as moment from 'moment';
// import * as _moment from 'moment';
import * as XLSX from 'xlsx';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {

	constructor() { }

	/**
	   * Build url parameters key and value pairs from array or object
	   * @param obj
	   */
	urlParam(obj: any): string {
		return Object.keys(obj)
			.map(k => k + '=' + encodeURIComponent(obj[k]))
			.join('&');
	}

	/**
	 * Simple object check.
	 * @param item
	 * @returns {boolean}
	 */
	isObject(item) {
		return item && typeof item === 'object' && !Array.isArray(item);
	}

	/**
	 * Deep merge two objects.
	 * @param target
	 * @param ...sources
	 * @see https://stackoverflow.com/a/34749873/1316921
	 */
	

	getPath(obj, val, path?) {
		path = path || '';
		let fullpath = '';
		for (const b in obj) {
			if (obj[b] === val) {
				return path + '/' + b;
			} else if (typeof obj[b] === 'object') {
				fullpath =
					this.getPath(obj[b], val, path + '/' + b) || fullpath;
			}
		}
		return fullpath;
	}

	constructDataTableParams(dataTablesParameters): HttpParams {
		let params = new HttpParams();

		params = params.append("draw", dataTablesParameters.draw);
		params = params.append("start", dataTablesParameters.start);
		params = params.append("length", dataTablesParameters.length);

		if (dataTablesParameters.search) {
			params = params.append('search' + '[value]', dataTablesParameters.search.value);
			params = params.append('search' + '[regex]', dataTablesParameters.search.regex);
		}
		if (dataTablesParameters.order) {
			for (let order in dataTablesParameters.order) {
				params = params.append('order' + '[' + order + ']' + '[column]', dataTablesParameters.order[order].column);
				params = params.append('order' + '[' + order + ']' + '[dir]', dataTablesParameters.order[order].dir);
			}
		}
		if (dataTablesParameters.columns) {
			let columns = dataTablesParameters.columns;
			for (let column in columns) {
				params = params.append('columns' + '[' + column + ']' + '[data]', columns[column].data);
				params = params.append('columns' + '[' + column + ']' + '[name]', columns[column].name);
				params = params.append('columns' + '[' + column + ']' + '[searchable]', 'true');
				params = params.append('columns' + '[' + column + ']' + '[orderable]', 'true');
				params = params.append('columns' + '[' + column + ']' + '[search]' + '[value]', '');
				params = params.append('columns' + '[' + column + ']' + '[search]' + '[regex]', 'false');
			}
		}
		return params;
	}

	// Date format as specified format
	getDateStringFromDateAndFormat(_date: Date, format: string): string {
		return new DatePipe('en-US').transform(_date, format);;
	}

	isNumber(value: string | number): boolean {
		return ((value != null) && !isNaN(Number(value.toString())));
	}

	gridSelectedLength(gridObj: any): any {
		return gridObj.rows('.selected').data().length;
	}

	gridSelectedRowData(gridObj: any): any {
		return gridObj.rows('.selected').data();
	}

	gridSelectedRowObjects(gridObj: any): any {
		return jQuery.map(gridObj.rows('.selected').data(), function (item) {
			return item;
		});
	}

	gridAllCellValue(gridObj: any, colName: string): any {
		let cellVal = [];
		gridObj.rows().data().filter(element => {
			cellVal.push(element[colName]);
		})
		return cellVal;
	}

	gridCurrentObjectList(gridObj: any): any {
		let objList = [];
		gridObj.rows().data().filter(element => {
			objList.push(element);
		})
		return objList;
	}

	gridSelectedCell(gridObj: any, colName: string): any {
		let cellVal = [];
		gridObj.rows('.selected').data().filter(element => {
			cellVal.push(element[colName]);
		})
		return cellVal;
	}

	// createFormElement(formModel: FormModel): any {

	// 	let form = document.createElement("form");
	// 	form.setAttribute('name', formModel.formName);
	// 	form.setAttribute('method', formModel.formMethod);
	// 	form.setAttribute('action', formModel.formAction);
	// 	form.setAttribute('target', formModel.formTarget);

	// 	return form;
	// }

	dynamicFormElement(formElement): any {

		let inputField = document.createElement(formElement.elm);
		if (formElement.elm == 'input' || formElement.elm == 'submit') {
			inputField.setAttribute('type', formElement.type);
			inputField.setAttribute('name', formElement.name)
			inputField.value = formElement.value;
			if (formElement.type == 'checkbox' || formElement.type == 'radio') {
				inputField.checked = 'checked'
			}
		}
		if (formElement.elm == 'select') { }
		return inputField;
	}

	removeLocalStorgeByKey(key: string): void {
		let arr = []; // Array to hold the keys
		// Iterate over localStorage and insert the keys that meet the condition into arr
		for (let i = 0; i < localStorage.length; i++) {
			if (localStorage.key(i).substring(0, 5) == key) {
				arr.push(localStorage.key(i));
			}
		}
		// Iterate over arr and remove the items by key
		for (let i = 0; i < arr.length; i++) {
			localStorage.removeItem(arr[i]);
		}
	}

	calculateTherapyDuration(timeDuration: string, duration: number, durationMu: string) {
		if (!timeDuration || !duration || !durationMu) {
			return;
		}
		let totalTimeDuration: any = 0;
		let totalDuration: any = 0;
		let therapyDuration: any = 0;

		if (timeDuration === 'Daily') {
			totalTimeDuration = 1;
		} else if (timeDuration === 'Alt Day') {
			totalTimeDuration = 0.5;
		}

		if (durationMu === 'Week(s)') {
			totalDuration = (duration * 7);
		} else if (durationMu === 'Day(s)') {
			totalDuration = duration;
		}
		therapyDuration = totalDuration * totalTimeDuration;

		return Math.ceil(therapyDuration);
	}

	nullCheck(value: any): any {
		if (value == null) {
			return "";
		}
		return value;
	}

	margeMedicineList(medicineArr: any[], continueMedicineArr: any[]) {
		continueMedicineArr.forEach(medicine => {
			if (!this.checkDuplicateItem(medicineArr, medicine)) {
				medicineArr.push(medicine);
			}
		});
		return medicineArr;
	}

	checkDuplicateItem(medicineList: any, medicine: any) {
		const data = medicine;

		return medicineList.some((item) => {
			if (data.favouriteNo && item.id == data.favouriteNo) {
				return true;
			} else if (data.brandName && item.brandName == data.brandName) {
				return true;
			} else if (data.favouriteVal && item.preDiagnosisVal == data.favouriteVal) {
				return true;
			} else if (item.preDiagnosisVal && item.preDiagnosisVal == data.preDiagnosisVal) {
				return true;
			} else if (item.preDiagnosisVal && item.preDiagnosisVal == data) {
				return true;
			} else { return false; }
		});
	}


	BmiCalculation(heightVal: number, weightVal: number): number {

		const hMuName = 'cm';
		const wMuName = 'kg';
		let finalResultBMI = 0.0;

		if (hMuName === 'cm' && wMuName === 'kg') {

			if (weightVal > 0 && heightVal > 0) {
				finalResultBMI = (weightVal / (heightVal / 100 * heightVal / 100));
				if (finalResultBMI < 18.5) {
					console.log('BMI RESULT: That you are too thin.');
				}
				if (finalResultBMI > 18.5 && finalResultBMI < 25) {
					console.log('BMI RESULT:  That you are healthy.');
				}
				if (finalResultBMI > 25) {
					console.log('BMI RESULT:  That you have overweight.');
				}
			}
			else {
				console.log('Error in BmiCalculation');
			}
		}
		return finalResultBMI;
	}

	BsaCalculation(heightVal: number, weightVal: number): number {

		const hMuName = 'cm';
		const wMuName = 'kg';
		let finalResultBSA = 0.0;

		if (hMuName === 'cm' && wMuName === 'kg') {
			if (weightVal > 0 && heightVal > 0) {
				// finalResultBSA = Math.sqrt(weightVal / (heightVal / 100));
				finalResultBSA = Math.sqrt((weightVal * heightVal) / 3600);
			} else {
				console.log('Error in BsaCalculation');
			}
		}
		return finalResultBSA;
	}

	BsaCalculationDubois(heightVal: number, weightVal: number): number {
		let bsa = 0.0;
		let hCal = Math.pow(heightVal, 0.725);
		let wCal = Math.pow(weightVal, 0.425);
		let bsaStr = Number((0.007184 * (hCal * wCal)).toFixed(2));
		if (!isNaN(bsaStr)) {
			return bsaStr;
		}
		return bsa;
	}

	/**
   * two array of object merge with remove duplicate.
   * @param firstArray
   * @param secondArray
   * @param field to compare
   * @see https://stackoverflow.com/questions/46869330/most-efficient-way-to-combine-arrays-removing-duplicates
   */
	
	printFormat(formatKey: string) {
		let reportFormatMap = new Map();
		reportFormatMap.set('JPG', 'image/jpg');
		reportFormatMap.set('PNG', 'image/png');
		reportFormatMap.set('JPEG', 'image/jpeg');
		reportFormatMap.set('PDF', 'application/pdf');
		reportFormatMap.set('XLSX', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		reportFormatMap.set('DOCX', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		return reportFormatMap.get(formatKey.toUpperCase());
	}
	//--start: ---------@author Sheikh Ibrahim------
	fileDownload(src: any, ext: string, name?: string) {
		const fileBlob = new Blob([src], { type: this.printFormat(ext) });
		const element = document.createElement('a');
		element.href = URL.createObjectURL(fileBlob);
		element.target = "_blank";
		element.download = name ? name : ('new_file.' + ext);
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
	fileOpenNewTab(src: any, ext: string, name?: string) {
		const fileBlob = new Blob([src], { type: this.printFormat(ext) });
		const fileURL = URL.createObjectURL(fileBlob);
		window.open(fileURL, name ? name : ('new_file.' + ext));
	}
	base64FileOpenNewTab(b64: any, ext: string, name?: string) {
		let byteArrays = this.fileUri2Array(b64);
		this.fileOpenNewTab(byteArrays, ext, name);
	}
	fileUri2Array(uri: any): any {
		if (uri.indexOf('base64,') > 0) {
			uri = uri.split('base64,')[1];
		}
		let raw = window.atob(uri), n = raw.length,
			a = new Uint8Array(new ArrayBuffer(n));
		for (var i = 0; i < n; i++) {
			a[i] = raw.charCodeAt(i);
		}
		return a;
	}
	formatBytes(bytes, decimal) {
		if (bytes === 0) return '0 Bytes';
		const kCB = 1024;
		const dmCM = decimal < 0 ? 0 : decimal;
		const sizCM = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const iCB = Math.floor(Math.log(bytes) / Math.log(kCB));
		return parseFloat((bytes / Math.pow(kCB, iCB)).toFixed(dmCM)) + ' ' + sizCM[iCB];
	}
	calculateBirthDate(ageYY: number, ageMm: number, ageDd: number): Date {
		let duration = moment.duration({ years: ageYY, months: ageMm, days: ageDd });
		return moment().subtract(duration).toDate();
	}
	calculateAge(dob: Date): any {
		let age = moment.duration(moment().diff(dob));
		return { 'ageYy': age.years(), 'ageMm': age.months(), 'ageDd': age.days() };
	}
	dateSetYyMmDd(date: Date, yy?: number, mm?: number, dd?: number): Date {
		let newDate = moment(date);
		if (yy) { newDate.set('year', yy) };
		if (mm) { newDate.set('month', mm) };
		if (dd) { newDate.set('date', dd) };
		return newDate.toDate();
	}
	dateSetHhMiScMs(date: Date, hh?: number, mi?: number, sc?: number, ms?: number): Date {
		let newDate = moment(date);
		if (hh) { newDate.set('hour', hh) };
		if (mi) { newDate.set('minute', mi) };
		if (sc) { newDate.set('second', sc) };
		if (ms) { newDate.set('millisecond', ms) };
		return newDate.toDate();
	}
	getIndexByProperty(items: any[], prop: string, val: any): number {
		return items.findIndex(item => item[prop] == val);
	}
	getCalEvent(id, title, startDate, allDay: boolean, endDate?, obj?, url?, bgColor?, textColor?): any {
		let calEvent: any = {};
		calEvent.id = id;
		calEvent.title = title;
		calEvent.start = startDate;
		calEvent.allDay = allDay;
		if (endDate) { calEvent.end = endDate };
		if (obj) { calEvent.constraint = JSON.stringify(obj) };
		if (url) { calEvent.url = url };
		if (bgColor) { calEvent.color = bgColor };
		if (textColor) { calEvent.textColor = textColor };
		return calEvent;
	}
	//==start: Find Date By DateCriteria===================
	findDateByCriteriaCode(criteriaCode: string): any {
		let returnObj: any = {};
		switch (criteriaCode) {
			case 'TODAY':
				returnObj = { 'startDate': moment().toDate(), 'endDate': moment().toDate() };
				break;
			case 'THIS_WEEK':
				returnObj = {
					'startDate': moment().startOf('week').toDate(),
					'endDate': moment().endOf('week').toDate()
				};
				break;
			case 'LAST_WEEK':
				returnObj = {
					'startDate': moment().subtract(1, 'weeks').startOf('week').toDate(),
					'endDate': moment().subtract(1, 'weeks').endOf('week').toDate()
				};
				break;
			case 'THIS_MONTH':
				returnObj = {
					'startDate': moment().startOf('month').toDate(),
					'endDate': moment().endOf('month').toDate()
				};
				break;
			case 'LAST_MONTH':
				returnObj = {
					'startDate': moment().subtract(1, 'month').startOf('month').toDate(),
					'endDate': moment().subtract(1, 'month').endOf('month').toDate()
				};
				break;
			case 'THIS_YEAR':
				returnObj = {
					'startDate': moment().startOf('year').toDate(),
					'endDate': moment().endOf('year').toDate()
				};
				break;
			default:
				returnObj = { 'startDate': moment().toDate(), 'endDate': moment().toDate() };
				break;
		}
		return returnObj;
	}
	//==end: Find Date By DateCriteria===================
	//--end: ---------@author Sheikh Ibrahim------

	onClickTreeTableBtn(event) {
		//start:---for others td block will be hide
		let isMinusClassExist: boolean = $(event.target).hasClass('tree-btn-minus');
		$(event.target).parent().parent().parent().find('.tree-btn-plus').removeClass('tree-btn-minus');
		$(event.target).parent().parent().parent().find('tr').removeClass('show-tree-tr-block');
		if (isMinusClassExist) {
			$(event.target).addClass('tree-btn-minus');
			$(event.target).parent().parent().next('.tree-tr-block').addClass('show-tree-tr-block');
		}
		//end:---for others td block will be hide
		$(event.target).parent().parent().next('.tree-tr-block').toggleClass('show-tree-tr-block');
		$(event.target).toggleClass('tree-btn-minus');
	}

	gridlistView() {
		$('#list-doc-appo').click(function (event) { event.preventDefault(); $('#selectDepartmentDoc .department-item-all').addClass('list-group-item'); });
		$('#grid-doc-appo').click(function (event) { event.preventDefault(); $('#selectDepartmentDoc .department-item-all').removeClass('list-group-item'); $('#products .item').addClass('grid-group-item'); });
	}

	// Dragable modal
	drageableModal() {
		let mc: any = $('.modal-content');
		let mod: any = $('.modal');
		mc.resizable({
			alsoResize: ".modal-dialog",
			// minHeight: 300,
			// minWidth: 300
		});
		mod.draggable();
	}

	uploadXlsxFile(file: File): Observable<string> {
		let workBook = null;
		let jsonData = null;
		const reader = new FileReader();
		let dataString = new Subject<string>();
		reader.onload = (event) => {
			const data = reader.result;
			workBook = XLSX.read(data, { type: 'binary' });
			jsonData = workBook.SheetNames.reduce((sheets, index) => {
				const sheet = workBook.Sheets[index];
				sheets[index] = XLSX.utils.sheet_to_json(sheet);
				return sheets[index];
			}, {});
			const str = JSON.stringify(jsonData);
			dataString.next(str);
			dataString.complete();
		}
		if (file) {
			reader.readAsBinaryString(file);
		}
		return dataString.asObservable();
	}

}

export function decimalFormat(value: any, decimalPoint?: number): any {
	return Number(Number.parseFloat(value).toFixed(decimalPoint ? decimalPoint : 2));
}

export function today(): Date {
	return moment().toDate();
}

export function isInteger(value: any): value is number {
	return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}


export function isString(value: any): value is string {
	return typeof value === 'string';
}

export function ellipsisText(data: string, charLength: number): string {
	if (data && data.length > charLength) {
		return data.slice(0, charLength).trim() + ' ...'.trim();
	}
	return data;
}


export function isHasFileData(file: Blob): boolean {
	if (file.size == 0) {
		return false;
	}
	return true;
}


export function mobileNoCheckIsBTRCAprv(mobileNo) {
	if (/^(?:\+?88)?01[13-9]\d{8}$/.test(mobileNo)) {
		return true;
	}
	return false;
}


export function isValidateEmail(mail) {
	if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) {
		return true;
	}
	return false;
}

export function addLoader(elementRef: ElementRef): void {
	if (!elementRef.nativeElement.classList.contains('loader')) {
		elementRef.nativeElement.classList.add('loader');
	}
}

export function removeLoader(elementRef: ElementRef): void {
	if (elementRef.nativeElement.classList.contains('loader')) {
		elementRef.nativeElement.classList.remove('loader');
	}
}


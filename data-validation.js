function validateBik(bik, error) {
	var result = false;
	if (typeof bik === 'number') {
		bik = bik.toString();
	} else if (typeof bik !== 'string') {
		bik = '';
	}
	if (!bik.length) {
		error.code = 1;
		error.message = 'БИК пуст';
	} else if (/[^0-9]/.test(bik)) {
		error.code = 2;
		error.message = 'БИК может состоять только из цифр';
	} else if (bik.length !== 9) {
		error.code = 3;
		error.message = 'БИК может состоять только из 9 цифр';
	} else {
		result = true;
	}
	return result;
}

function validateInn(inn, error) {
	var result = false;
	if (typeof inn === 'number') {
		inn = inn.toString();
	} else if (typeof inn !== 'string') {
		inn = '';
	}
	if (!inn.length) {
		error.code = 1;
		error.message = 'ИНН пуст';
	} else if (/[^0-9]/.test(inn)) {
		error.code = 2;
		error.message = 'ИНН может состоять только из цифр';
	} else if ([10, 12].indexOf(inn.length) === -1) {
		error.code = 3;
		error.message = 'ИНН может состоять только из 10 или 12 цифр';
	} else {
		var checkDigit = function (inn, coefficients) {
			var n = 0;
			for (var i in coefficients) {
				n += coefficients[i] * inn[i];
			}
			return parseInt(n % 11 % 10);
		};
		switch (inn.length) {
			case 10:
				var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if (n10 === parseInt(inn[9])) {
					result = true;
				}
				break;
			case 12:
				var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
					result = true;
				}
				break;
		}
		if (!result) {
			error.code = 4;
			error.message = 'Неправильное контрольное число';
		}
	}
	return result;
}

function validateKpp(kpp, error) {
	var result = false;
	if (typeof kpp === 'number') {
		kpp = kpp.toString();
	} else if (typeof kpp !== 'string') {
		kpp = '';
	}
	if (!kpp.length) {
		error.code = 1;
		error.message = 'КПП пуст';
	} else if (kpp.length !== 9) {
		error.code = 2;
		error.message = 'КПП может состоять только из 9 знаков (цифр или заглавных букв латинского алфавита от A до Z)';
	} else if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
		error.code = 3;
		error.message = 'Неправильный формат КПП';
	} else {
		result = true;
	}
	return result;
}

function validateKs(ks, bik, error) {
	var result = false;
	if (validateBik(bik, error)) {
		if (typeof ks === 'number') {
			ks = ks.toString();
		} else if (typeof ks !== 'string') {
			ks = '';
		}
		if (!ks.length) {
			error.code = 1;
			error.message = 'К/С пуст';
		} else if (/[^0-9]/.test(ks)) {
			error.code = 2;
			error.message = 'К/С может состоять только из цифр';
		} else if (ks.length !== 20) {
			error.code = 3;
			error.message = 'К/С может состоять только из 20 цифр';
		} else {
			var bikKs = '0' + bik.toString().slice(4, 6) + ks;
			var checksum = 0;
			var coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
			for (var i in coefficients) {
				checksum += (coefficients[i] * bikKs[i]) % 10;
			}
			if (checksum % 10 === 0) {
				result = true;
			} else {
				error.code = 4;
				error.message = 'Неправильное контрольное число';
			}
		}
	}
	return result;
}

function validateOgrn(ogrn, error) {
	var result = false;
	if (typeof ogrn === 'number') {
		ogrn = ogrn.toString();
	} else if (typeof ogrn !== 'string') {
		ogrn = '';
	}
	if (!ogrn.length) {
		error.code = 1;
		error.message = 'ОГРН пуст';
	} else if (/[^0-9]/.test(ogrn)) {
		error.code = 2;
		error.message = 'ОГРН может состоять только из цифр';
	} else if (ogrn.length !== 13) {
		error.code = 3;
		error.message = 'ОГРН может состоять только из 13 цифр';
	} else {
		var n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
		if (n13 === parseInt(ogrn[12])) {
			result = true;
		} else {
			error.code = 4;
			error.message = 'Неправильное контрольное число';
		}
	}
	return result;
}

function validateOgrnip(ogrnip, error) {
	var result = false;
	if (typeof ogrnip === 'number') {
		ogrnip = ogrnip.toString();
	} else if (typeof ogrnip !== 'string') {
		ogrnip = '';
	}
	if (!ogrnip.length) {
		error.code = 1;
		error.message = 'ОГРНИП пуст';
	} else if (/[^0-9]/.test(ogrnip)) {
		error.code = 2;
		error.message = 'ОГРНИП может состоять только из цифр';
	} else if (ogrnip.length !== 15) {
		error.code = 3;
		error.message = 'ОГРНИП может состоять только из 15 цифр';
	} else {
		var n15 = parseInt((parseInt(ogrnip.slice(0, -1)) % 13).toString().slice(-1));
		if (n15 === parseInt(ogrnip[14])) {
			result = true;
		} else {
			error.code = 4;
			error.message = 'Неправильное контрольное число';
		}
	}
	return result;
}

function validateRs(rs, bik, error) {
	var result = false;
	if (validateBik(bik, error)) {
		if (typeof rs === 'number') {
			rs = rs.toString();
		} else if (typeof rs !== 'string') {
			rs = '';
		}
		if (!rs.length) {
			error.code = 1;
			error.message = 'Р/С пуст';
		} else if (/[^0-9]/.test(rs)) {
			error.code = 2;
			error.message = 'Р/С может состоять только из цифр';
		} else if (rs.length !== 20) {
			error.code = 3;
			error.message = 'Р/С может состоять только из 20 цифр';
		} else {
			var bikRs = bik.toString().slice(-3) + rs;
			var checksum = 0;
			var coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
			for (var i in coefficients) {
				checksum += coefficients[i] * (bikRs[i] % 10);
			}
			if (checksum % 10 === 0) {
				result = true;
			} else {
				error.code = 4;
				error.message = 'Неправильное контрольное число';
			}
		}
	}
	return result;
}

function validateSnils(snils, error) {
	var result = false;
	if (typeof snils === 'number') {
		snils = snils.toString();
	} else if (typeof snils !== 'string') {
		snils = '';
	}
	if (!snils.length) {
		error.code = 1;
		error.message = 'СНИЛС пуст';
	} else if (/[^0-9]/.test(snils)) {
		error.code = 2;
		error.message = 'СНИЛС может состоять только из цифр';
	} else if (snils.length !== 11) {
		error.code = 3;
		error.message = 'СНИЛС может состоять только из 11 цифр';
	} else {
		var sum = 0;
		for (var i = 0; i < 9; i++) {
			sum += parseInt(snils[i]) * (9 - i);
		}
		var checkDigit = 0;
		if (sum < 100) {
			checkDigit = sum;
		} else if (sum > 101) {
			checkDigit = parseInt(sum % 101);
			if (checkDigit === 100) {
				checkDigit = 0;
			}
		}
		if (checkDigit === parseInt(snils.slice(-2))) {
			result = true;
		} else {
			error.code = 4;
			error.message = 'Неправильное контрольное число';
		}
	}
	return result;
}

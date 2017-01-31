function getTests(errorCodeForZero) {
	return [
		[null, false, 1],
		['', false, 1],
		[' ', false, 2],
		// ----
		[0, false, errorCodeForZero],
		[0., false, errorCodeForZero],
		[0.0, false, errorCodeForZero],
		[.0, false, errorCodeForZero],
		['0', false, errorCodeForZero],
		['0.', false, 2],
		['0.0', false, 2],
		['.0', false, 2],
		// ----
		[1, false, errorCodeForZero],
		// ----
		[[], false, 1],
		['a123', false, 2],
		['123-', false, 2]
	];
}

QUnit.test('Bik', function (assert) {
	var data = [].concat(getTests(3), [
		['01234567', false, 3],
		['12345678', false, 3],
		['000000000', true, null],
		['012345678', true, null],
		['123456789', true, null],
		['0123456789', false, 3],
		['1234567890', false, 3]
	]);
	for (var i in data) {
		var error = {
			code: null,
			message: null
		};
		assert.ok(validateBik(data[i][0], error) === data[i][1], ['1)', i, data[i][0]].join(' '));
		assert.ok(error.code === data[i][2], ['2)', i, data[i][0]].join(' '));
	}
});

QUnit.test('Inn', function (assert) {
	var data = [].concat(getTests(3), [
		['000000000', false, 3],
		['012345678', false, 3],
		['123456789', false, 3],
		['0000000000', true, null],
		['0123456789', false, 4],
		['1234567890', false, 4],
		['00000000000', false, 3],
		['01234567890', false, 3],
		['12345678901', false, 3],
		['000000000000', true, null],
		['012345678901', false, 4],
		['123456789012', false, 4],
		['0000000000000', false, 3],
		['0123456789012', false, 3],
		['1234567890123', false, 3],
		// ----
		['7827004526', true, null],
		['8827004526', false, 4],
		['7837004526', false, 4],
		['7827104526', false, 4],
		['7827005526', false, 4],
		['7827004536', false, 4],
		// ----
		['760307073214', true, null],
		['860307073214', false, 4],
		['761307073214', false, 4],
		['760317073214', false, 4],
		['760307173214', false, 4],
		['760307074214', false, 4],
		['760307073224', false, 4]
	]);
	for (var i in data) {
		var error = {
			code: null,
			message: null
		};
		assert.ok(validateInn(data[i][0], error) === data[i][1], ['1)', i, data[i][0]].join(' '));
		assert.ok(error.code === data[i][2], ['2)', i, data[i][0]].join(' '));
	}
});

QUnit.test('Kpp', function (assert) {
	var data = [].concat(getTests(2), [
		['01234567', false, 2],
		['12345678', false, 2],
		['000000000', true, null],
		['012345678', true, null],
		['123456789', true, null],
		['0123456789', false, 2],
		['1234567890', false, 2],
		// ----
		['0000AZ000', true, null],
		['0000aZ000', false, 3],
		['0000A-000', false, 3]
	]);
	for (var i in data) {
		var error = {
			code: null,
			message: null
		};
		assert.ok(validateKpp(data[i][0], error) === data[i][1], ['1)', i, data[i][0]].join(' '));
		assert.ok(error.code === data[i][2], ['2)', i, data[i][0]].join(' '));
	}
});

QUnit.test('Ks', function (assert) {
	var data = [].concat(getTests(3), [
		['0000000000000000000', '000000000', false, 3],
		['0123456789012345678', '000000000', false, 3],
		['1234567890123456789', '000000000', false, 3],
		['00000000000000000000', '000000000', true, null],
		['01234567890123456789', '000000000', false, 4],
		['12345678901234567890', '000000000', false, 4],
		['000000000000000000000', '000000000', false, 3],
		['012345678901234567890', '000000000', false, 3],
		['123456789012345678901', '000000000', false, 3],
		// ----
		['30101810200000000827', '044030827', true, null],
		['40101810200000000827', '044030827', false, 4],
		['30201810200000000827', '044030827', false, 4],
		['30102810200000000827', '044030827', false, 4],
		['30101820200000000827', '044030827', false, 4],
		['30101810400000000827', '044030827', false, 4],
		['30101810201000000827', '044030827', false, 4],
		['30101810200010000827', '044030827', false, 4],
		['30101810200000100827', '044030827', false, 4],
		['30101810200000001827', '044030827', false, 4],
		['30101810200000000837', '044030827', false, 4]
	]);
	for (var i in data) {
		var error = {
			code: null,
			message: null
		};
		if (data[i].length === 4) {
			assert.ok(validateKs(data[i][0], data[i][1], error) === data[i][2], ['1)', i, data[i][0]].join(' '));
			assert.ok(error.code === data[i][3], ['2)', i, data[i][0]].join(' '));
		} else {
			assert.ok(validateKs(data[i][0], '000000000', error) === data[i][1], ['1)', i, data[i][0]].join(' '));
			assert.ok(error.code === data[i][2], ['2)', i, data[i][0]].join(' '));
		}
	}
});

QUnit.test('Ogrn', function (assert) {
	var data = [].concat(getTests(3), [
		['000000000000', false, 3],
		['012345678901', false, 3],
		['123456789012', false, 3],
		['0000000000000', true, null],
		['0123456789012', false, 4],
		['1234567890123', false, 4],
		['00000000000000', false, 3],
		['01234567890123', false, 3],
		['12345678901234', false, 3],
		// ----
		['1027812400868', true, null],
		['2027812400868', false, 4],
		['1037812400868', false, 4],
		['1027912400868', false, 4],
		['1027813400868', false, 4],
		['1027812410868', false, 4],
		['1027812400968', false, 4],
		['1027812400869', false, 4]
	]);
	for (var i in data) {
		var error = {
			code: null,
			message: null
		};
		assert.ok(validateOgrn(data[i][0], error) === data[i][1], ['1)', i, data[i][0]].join(' '));
		assert.ok(error.code === data[i][2], ['2)', i, data[i][0]].join(' '));
	}
});

QUnit.test('Ogrnip', function (assert) {
	var data = [].concat(getTests(3), [
		['00000000000000', false, 3],
		['01234567890123', false, 3],
		['12345678901234', false, 3],
		['000000000000000', true, null],
		['012345678901234', false, 4],
		['123456789012345', false, 4],
		['0000000000000000', false, 3],
		['0123456789012345', false, 3],
		['1234567890123456', false, 3],
		// ----
		['307760324100018', true, null],
		['407760324100018', false, 4],
		['308760324100018', false, 4],
		['307770324100018', false, 4],
		['307760424100018', false, 4],
		['307760325100018', false, 4],
		['307760324110018', false, 4],
		['307760324100118', false, 4],
		['307760324100019', false, 4]
	]);
	for (var i in data) {
		var error = {
			code: null,
			message: null
		};
		assert.ok(validateOgrnip(data[i][0], error) === data[i][1], ['1)', i, data[i][0]].join(' '));
		assert.ok(error.code === data[i][2], ['2)', i, data[i][0]].join(' '));
	}
});

QUnit.test('Rs', function (assert) {
	var data = [].concat(getTests(3), [
		['0000000000000000000', '000000000', false, 3],
		['0123456789012345678', '000000000', false, 3],
		['1234567890123456789', '000000000', false, 3],
		['00000000000000000000', '000000000', true, null],
		['01234567890123456789', '000000000', false, 4],
		['12345678901234567890', '000000000', false, 4],
		['000000000000000000000', '000000000', false, 3],
		['012345678901234567890', '000000000', false, 3],
		['123456789012345678901', '000000000', false, 3],
		// ----
		['40702810900000002851', '044030827', true, null],
		['50702810900000002851', '044030827', false, 4],
		['40802810900000002851', '044030827', false, 4],
		['40703810900000002851', '044030827', false, 4],
		['40702820900000002851', '044030827', false, 4],
		['40702810000000002851', '044030827', false, 4],
		['40702810901000002851', '044030827', false, 4],
		['40702810900010002851', '044030827', false, 4],
		['40702810900000102851', '044030827', false, 4],
		['40702810900000003851', '044030827', false, 4],
		['40702810900000002861', '044030827', false, 4]
	]);
	for (var i in data) {
		var error = {
			code: null,
			message: null
		};
		if (data[i].length === 4) {
			assert.ok(validateRs(data[i][0], data[i][1], error) === data[i][2], ['1)', i, data[i][0]].join(' '));
			assert.ok(error.code === data[i][3], ['2)', i, data[i][0]].join(' '));
		} else {
			assert.ok(validateRs(data[i][0], '000000000', error) === data[i][1], ['1)', i, data[i][0]].join(' '));
			assert.ok(error.code === data[i][2], ['2)', i, data[i][0]].join(' '));
		}
	}
});

QUnit.test('Snils', function (assert) {
	var data = [].concat(getTests(3), [
		['0000000000', false, 3],
		['0123456789', false, 3],
		['1234567890', false, 3],
		['00000000000', true, null],
		['01234567890', false, 4],
		['12345678901', false, 4],
		['000000000000', false, 3],
		['012345678901', false, 3],
		['123456789012', false, 3],
		// ----
		['08765430300', true, null],
		['18765430300', false, 4],
		['08865430300', false, 4],
		['08766430300', false, 4],
		['08765440300', false, 4],
		['08765430400', false, 4],
		['08765430301', false, 4]
	]);
	for (var i in data) {
		var error = {
			code: null,
			message: null
		};
		assert.ok(validateSnils(data[i][0], error) === data[i][1], ['1)', i, data[i][0]].join(' '));
		assert.ok(error.code === data[i][2], ['2)', i, data[i][0]].join(' '));
	}
});
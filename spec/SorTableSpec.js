global.window = require('jsdom').jsdom().createWindow();

require('../jquery-1.9.1');
global.jQuery = window.jQuery;

require('../SorTable.js');
var $ = window.jQuery;

describe('SorTable', function() {

    var table = '<table>' +
                    '<thead>' +
                        '<tr>' +
                            '<th>ColumnNumber</th>' +
                            '<th>ColumnString</th>' +
                            '<th>ColumnDate</th>' +
                            '<th>ColumnCustom</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                        '<tr>' +
                            '<td>12</td>' +
                            '<td>abc</td>' +
                            '<td>2 Jan 2013</td>' +
                            '<td>70 %</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>5.3434</td>' +
                            '<td>qq</td>' +
                            '<td>05-12-2013</td>' +
                            '<td>5 %</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td>-123123</td>' +
                            '<td>OIU</td>' +
                            '<td>05 10 2010</td>' +
                            '<td>50 %</td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>';

    describe('defaults',  function() {

        it("should have pointer as a default css cursor value", function() {
            expect($.fn.sorTable.defaults.css.cursor).toEqual("pointer");
        });

    });

    describe('initialize', function() {

        it('should set the default css cursor property for given columns', function() {

            var $table = $(table);
            $table.sorTable({
                columns: {
                    ColumnNumber: 'Number'
                }
            });
            var cursorStyle = $table
                .find('thead>tr>th:contains("ColumnNumber")')
                .css('cursor');
            expect(cursorStyle).toEqual('pointer');

        });

        it('should set a custom css cursor property for given columns', function() {

            var $table = $(table);
            $table.sorTable({
                css: {
                    cursor: 'crosshair'
                },
                columns: {
                    ColumnNumber: 'Number'
                }
            });
            var cursorStyle = $table
                .find('thead>tr>th:contains("ColumnNumber")')
                .css('cursor');
            expect(cursorStyle).toEqual('crosshair');

        });

    });

    describe('onclick', function() {

        var $table;

        describe('number column', function() {

            beforeEach(function() {

                $table = $(table);
                $table.sorTable({
                    columns: {
                        ColumnNumber: 'Number'
                    }
                });

            });

            it('should sort a number column ascending on first click', function() {

                $table.find('thead>tr>th:contains("ColumnNumber")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[0]).text()).toEqual("-123123");
                expect($(bodyCells[4]).text()).toEqual("5.3434");
                expect($(bodyCells[8]).text()).toEqual("12");

            });

            it('should sort a number column descending on second click',function() {

                $table.find('thead>tr>th:contains("ColumnNumber")').trigger('click');
                $table.find('thead>tr>th:contains("ColumnNumber")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[8]).text()).toEqual("-123123");
                expect($(bodyCells[4]).text()).toEqual("5.3434");
                expect($(bodyCells[0]).text()).toEqual("12");

            });

            it('should sort a number column ascending on third click',function() {

                $table.find('thead>tr>th:contains("ColumnNumber")').trigger('click');
                $table.find('thead>tr>th:contains("ColumnNumber")').trigger('click');
                $table.find('thead>tr>th:contains("ColumnNumber")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[0]).text()).toEqual("-123123");
                expect($(bodyCells[4]).text()).toEqual("5.3434");
                expect($(bodyCells[8]).text()).toEqual("12");

            });

        });

        describe('string column', function() {

            beforeEach(function() {

                $table = $(table);
                $table.sorTable({
                    columns: {
                        ColumnString: 'String'
                    }
                });

            });

            it('should sort a string column ascending on first click', function() {

                $table.find('thead>tr>th:contains("ColumnString")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[1]).text()).toEqual("OIU");
                expect($(bodyCells[5]).text()).toEqual("abc");
                expect($(bodyCells[9]).text()).toEqual("qq");

            });

            it('should sort a string column descending on second click',function() {

                $table.find('thead>tr>th:contains("ColumnString")').trigger('click');
                $table.find('thead>tr>th:contains("ColumnString")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[9]).text()).toEqual("OIU");
                expect($(bodyCells[5]).text()).toEqual("abc");
                expect($(bodyCells[1]).text()).toEqual("qq");

            });

        });

        describe('date column', function() {

            beforeEach(function() {

                $table = $(table);
                $table.sorTable({
                    columns: {
                        ColumnDate: 'Date'
                    }
                });

            });

            it('should sort a date column ascending on first click', function() {

                $table.find('thead>tr>th:contains("ColumnDate")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[2]).text()).toEqual("05 10 2010");
                expect($(bodyCells[6]).text()).toEqual("2 Jan 2013");
                expect($(bodyCells[10]).text()).toEqual("05-12-2013");

            });

            it('should sort a date column descending on second click',function() {

                $table.find('thead>tr>th:contains("ColumnDate")').trigger('click');
                $table.find('thead>tr>th:contains("ColumnDate")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[10]).text()).toEqual("05 10 2010");
                expect($(bodyCells[6]).text()).toEqual("2 Jan 2013");
                expect($(bodyCells[2]).text()).toEqual("05-12-2013");

            });


        });

        describe('custom column', function() {

            beforeEach(function() {

                $table = $(table);
                $table.sorTable({
                    columns: {
                        ColumnCustom: function(a, b) {
                            var regExA = /(\d+)/g;
                            var regExB = /(\d+)/g;
                            var valA = parseFloat(regExA.exec(a)[0]);
                            var valB = parseFloat(regExB.exec(b)[0]);
                            return valA - valB;
                        }
                    }
                });

            });

            it('should sort a custom column ascending on first click', function() {

                $table.find('thead>tr>th:contains("ColumnCustom")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[3]).text()).toEqual("5 %");
                expect($(bodyCells[7]).text()).toEqual("50 %");
                expect($(bodyCells[11]).text()).toEqual("70 %");

            });

            it('should sort a custom column descending on second click',function() {

                $table.find('thead>tr>th:contains("ColumnCustom")').trigger('click');
                $table.find('thead>tr>th:contains("ColumnCustom")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[11]).text()).toEqual("5 %");
                expect($(bodyCells[7]).text()).toEqual("50 %");
                expect($(bodyCells[3]).text()).toEqual("70 %");

            });

        });

    });

    describe('sort', function() {

        var $table;

        describe('errors', function() {

            it('should throw an error if column cannot be found', function() {

                $table = $(table);
                expect(function() {
                    $table.sorTable('FooBar', 'ascending', 'String');
                }).toThrow('No column with name FooBar');

            });
        });

        describe('number columns', function() {

            beforeEach(function() {

                $table = $(table);

            });

            it('should sort a number column ascending', function() {

                $table.sorTable('ColumnNumber', 'ascending', 'Number');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[0]).text()).toEqual("-123123");
                expect($(bodyCells[4]).text()).toEqual("5.3434");
                expect($(bodyCells[8]).text()).toEqual("12");

            });

            it('should sort a number column ascending', function() {

                $table.sorTable('ColumnNumber', 'descending', 'Number');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[8]).text()).toEqual("-123123");
                expect($(bodyCells[4]).text()).toEqual("5.3434");
                expect($(bodyCells[0]).text()).toEqual("12");

            });

        });

        describe('string column', function() {

            beforeEach(function() {

                $table = $(table);

            });

            it('should sort a string column ascending', function() {

                $table.sorTable('ColumnString', 'ascending', 'String');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[1]).text()).toEqual("OIU");
                expect($(bodyCells[5]).text()).toEqual("abc");
                expect($(bodyCells[9]).text()).toEqual("qq");

            });

            it('should sort a string column descending',function() {

                $table.sorTable('ColumnString', 'descending', 'String');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[9]).text()).toEqual("OIU");
                expect($(bodyCells[5]).text()).toEqual("abc");
                expect($(bodyCells[1]).text()).toEqual("qq");

            });

        });

        describe('date column', function() {

            beforeEach(function() {

                $table = $(table);

            });

            it('should sort a date column ascending', function() {

                $table.sorTable('ColumnDate', 'ascending', 'Date');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[2]).text()).toEqual("05 10 2010");
                expect($(bodyCells[6]).text()).toEqual("2 Jan 2013");
                expect($(bodyCells[10]).text()).toEqual("05-12-2013");

            });

            it('should sort a date column descending',function() {

                $table.sorTable('ColumnDate', 'descending', 'Date');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[10]).text()).toEqual("05 10 2010");
                expect($(bodyCells[6]).text()).toEqual("2 Jan 2013");
                expect($(bodyCells[2]).text()).toEqual("05-12-2013");

            });


        });

        describe('custom column', function() {

            beforeEach(function() {

                $table = $(table);
                $table.sorTable({
                    columns: {
                        ColumnCustom: function(a, b) {
                            var regExA = /(\d+)/g;
                            var regExB = /(\d+)/g;
                            var valA = parseFloat(regExA.exec(a)[0]);
                            var valB = parseFloat(regExB.exec(b)[0]);
                            return valA - valB;
                        }
                    }
                });

            });

            it('should sort a custom column ascending', function() {

                $table.sorTable('ColumnCustom', 'ascending', function(a, b) {
                    var regExA = /(\d+)/g;
                    var regExB = /(\d+)/g;
                    var valA = parseFloat(regExA.exec(a)[0]);
                    var valB = parseFloat(regExB.exec(b)[0]);
                    return valA - valB;
                });

                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[3]).text()).toEqual("5 %");
                expect($(bodyCells[7]).text()).toEqual("50 %");
                expect($(bodyCells[11]).text()).toEqual("70 %");

            });

            it('should sort a custom column descending',function() {

                $table.sorTable('ColumnCustom', 'descending', function(a, b) {
                    var regExA = /(\d+)/g;
                    var regExB = /(\d+)/g;
                    var valA = parseFloat(regExA.exec(a)[0]);
                    var valB = parseFloat(regExB.exec(b)[0]);
                    return valA - valB;
                });
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[11]).text()).toEqual("5 %");
                expect($(bodyCells[7]).text()).toEqual("50 %");
                expect($(bodyCells[3]).text()).toEqual("70 %");

            });

        });

    });

});

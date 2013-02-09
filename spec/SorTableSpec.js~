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

        describe('number column', function() {

            var $table;
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

            it('should sort a number column ascending on first click', function() {

                $table.find('thead>tr>th:contains("ColumnString")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[1]).text()).toEqual("-123123");
                expect($(bodyCells[5]).text()).toEqual("5.3434");
                expect($(bodyCells[9]).text()).toEqual("12");

            });

            it('should sort a number column descending on second click',function() {

                $table.find('thead>tr>th:contains("ColumnString")').trigger('click');
                $table.find('thead>tr>th:contains("ColumnString")').trigger('click');
                var bodyCells = $table.find('tbody>tr>td');
                expect($(bodyCells[9]).text()).toEqual("-123123");
                expect($(bodyCells[5]).text()).toEqual("5.3434");
                expect($(bodyCells[1]).text()).toEqual("12");

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

        });

        describe('custom column', function() {

            beforeEach(function() {

                $table = $(table);
                $table.sorTable({
                    columns: {
                        ColumnCustom: function() {
                            //TODO IMPLEMENT
                        }
                    }
                });

            });


        });

    });

});

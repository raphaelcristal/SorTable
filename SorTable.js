(function($) {


    var sortAsNumber = function(a, b) {

        var aAsNumber = parseFloat(a);
        var bAsNumber = parseFloat(b);
        if(a === b) return 0;
        return a > b ? 1 : -1;

    };

    var sort = function(column, type, direction) {
        var $column = $(column);
        var tBody = $column.closest('table').find('tbody');
        var tableRows = tBody.children();
        var columnIndex = $column.parent().children().index($column);

        tableRows.sort(function(a, b) {
            var valA = $($(a).children().get(columnIndex)).text();
            var valB = $($(b).children().get(columnIndex)).text();
            switch(type) {
                case 'Number':
                    return sortAsNumber(valA, valB);
                case 'String':
                    return sortAsString(valA, valB);
                case 'Date':
                    return sortAsDate(valA, valB);
                default:
                    throw new Error('Unsupported type ' + type);
            }
        });

        tableRows.remove();
        tBody.append(tableRows);
    };

    var init = function(opts) {

        this.find('thead>tr>th')
            .filter(function() {
                return opts.columns.hasOwnProperty($(this).text());
            })
            .css(opts.css)
            .click(function(e) {
                var columnHeader = $(this).text();
                sort(this, opts.columns[columnHeader], 'ascending');
                });

    };

    $.fn.sorTable = function(method, column, direction) {

        //initialization
        if(column === undefined && direction === undefined){
            var opts = $.extend({}, $.fn.sorTable.defaults, method);
            init.apply(this, [opts]);
        } else if(method === 'sort'){
            sort(column, direction);
        }

    };

    $.fn.sorTable.defaults = {

        css: {
            cursor: "pointer"
        }

    };

})(jQuery);

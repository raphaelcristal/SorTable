(function($) {


    var sortAsNumber = function(a, b) {

        var aAsNumber = parseFloat(a);
        var bAsNumber = parseFloat(b);
        return a - b;

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
        if(direction === 'descending') {
            tableRows = tableRows.toArray().reverse();
        }
        tBody.append(tableRows);

    };

    var init = function(opts) {

        var column;
        var currentDirections = {};

        for(column in opts.columns) {
            if(opts.columns.hasOwnProperty(column)) {
                currentDirections[column] = undefined;
            }
        }

        this.find('thead>tr>th')
            .filter(function() {
                return opts.columns.hasOwnProperty($(this).text());
            })
            .css(opts.css)
            .click(function(e) {
                var columnHeader = $(this).text();
                if(currentDirections[columnHeader] === undefined ||
                        currentDirections[columnHeader] === 'descending') {
                    currentDirections[columnHeader] = 'ascending';
                } else if(currentDirections[columnHeader] === 'ascending') {
                    currentDirections[columnHeader] = 'descending';
                }
                sort(this, opts.columns[columnHeader], currentDirections[columnHeader]);
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

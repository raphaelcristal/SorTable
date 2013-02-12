SorTable
========

SorTable is a JQuery Plugin for sorting standard html tables. It is very minimal by choice and avoids features like automatically detecting the type of data. It only works for tables with a thead and tbody.

Demo:
Check out a simple demo <a href="http://codepen.io/anon/pen/levgb">here</a>

Example table:

```html
<table id="my-table">
    <thead>
        <tr>
            <th>ColumnNumber</th>
            <th>ColumnString</th>
            <th>ColumnDate</th>
            <th>ColumnCustomn</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>15</td>
            <td>"foo bar"</td>
            <td>25 Feb 2013</td>
            <td>70 %</td>
        </tr>
        <!-- more rows ... -->
    </tbody>
</table>
```

You can initialize sortable like this:

```javascript
$('#my-table').sorTable({
    columns: {
        ColumnNumber: 'Number',
        ColumnString: 'String',
        ColumnDate: 'Date'
    }
});
```

Now you can sort the table by clicking the columns header. By default SorTable changes the cursor property to pointer, so it's obvious to the user that this column is sortable. You can change that behaviour by setting the css property on init oder change the default value at $.fn.sorTable.defaults.css .

```javascript
$('#my-table').sorTable({
    css: {
        cursor: "crosshair"
    },
    //... columns
});
```

# Supported Types

SorTable supports the following types by default:

* Number
* String
* Date

Dates will be parsed by using JavaScripts date object. The string should be recognized by the parse method. For more information read [this](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse). SorTable also gives you the opportunity to specify a custom sort function, which allows sorting of any type. It recieves the paramter a and b, and should return 0 if they are equal, a value greater than 0 if a is greater than b and a negative value if b is greater than a.

```javascript
$('#my-table').sorTable({
    columns: {
        ColumnCustom: funtion(a, b) {
            var regExA = /(\d+)/g;
            var regExB = /(\d+)/g;
            var valA = parseFloat(regExA.exec(a)[0]);
            var valB = parseFloat(regExB.exec(b)[0]);
            return valA - valB;
        })
    }
});
```


# Invoke by Script
SorTable can also be invoked by javascript like this:

```javascript
$('#my-table').sorTable('ColumnNumber', 'ascending', 'Number');
$('#my-table').sorTable('ColumnString', 'descending', 'String');
```

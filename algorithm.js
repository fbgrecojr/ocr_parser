module.exports = function(garbage){

    //cleanup
    if(!garbage) return null;
    
    //initilize js obj
    var toReturn = {
        total:      null,
        vendor:     null,
        date:       null
    };
    
    //create space delimited array
    var arr = garbage.split(' ');

    var dateMatch = /([0-9]{1,2}|[a-zA-Z]{3})(\/|-|\.|')[0-9]{1,2}(\/|-|\.|')[0-9]{2,4}/g;
    var totalMatch = /(\$?)[0-9]{1,5}\.[0-9]{2}/g;
    var webMatch = /www.*.com/g;
    
    for(var i=0; i<arr.length; ++i){

        //does it match a date?
        if (dateMatch.test(arr[i]))
            if(toReturn.date == null)
                toReturn.date = arr[i].match(dateMatch)[0];
        
        if (arr[i].toLowerCase() === 'total')
            if(arr[i+1] != null && totalMatch.test(arr[i+1]))
                if(toReturn.total == null)
                    toReturn.total = arr[i+1];
        
        if (webMatch.test(arr[i]))
            if(toReturn.vendor == null)
                toReturn.vendor = arr[i].match(webMatch)[0].split('.')[1];
    }
    
    //still not vendor
    if(toReturn.vendor == null && arr.length > 0)
        toReturn.vendor = arr[0];
    
    return toReturn;
}
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

    var dateMatch = /([0-9]{1,2}|[a-zA-Z]{3})(\/|-|\.|'| )[0-3][0-9](\/|-|\.|'|,|, )(?:\d{2}){1,2}/g;
    var totalMatch = /(\$?)[0-9]{1,5}\.[0-9]{2}/g;
    var totalTitleMatch = /^total$|^Total$|^TOTAL$/g;
    var venderMath = /Walmart|walmart|McDonald's|Best Buy|BEST BUY|Apple/g
    
    for(var i=0; i<arr.length; ++i){

        //does it match a date?
        if (dateMatch.test(arr[i]))
            if(toReturn.date == null)
                toReturn.date = arr[i].match(dateMatch)[0];
        
        if (totalTitleMatch.test(arr[i].toLowerCase()))
            if(arr[i+1] != null && totalMatch.test(arr[i+1]))
                if(toReturn.total == null)
                    toReturn.total = arr[i+1].match(totalMatch)[0];
        
        if (venderMath.test(arr[i] + ' ' + arr[i+1]))
            if(toReturn.vendor == null)
                toReturn.vendor = (arr[i] + ' ' + arr[i+1]).match(venderMath)[0];
    }
    
    return toReturn;
}
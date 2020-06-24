async function waitForSwap(xx,yy){
    svg.select(".line"+xx).transition().duration(duration).attr("transform","translate(" + x(yy)+")");
    return new Promise(resolve=>{
        setTimeout(()=>resolve("done"),1);
    });
}

async function bubbSort(data) {
    for (var i = 0; i < n-1; i++) {
        for(var  j = 0; j<n-i-1;j++){
            if(stop){
                toggleButtons();
                return stop=false;
            }
            if (data[j] > data[j + 1]) {
                await waitForSwap(data[j],j+1);
                await waitForSwap(data[j+1],j);
                let temp = data[j];
                data[j] = data[j+1];
                data[j+1] = temp;
            }
        }
    }
    toggleButtons();
}

async function selectSort(data){
    for (var i = 0; i < n-1; i++){
        if(stop){
            toggleButtons();
            return stop=false;
        }
        var min = i;
        for(var j = i + 1; j < n; j++){
            if(data[j] < data[min]) {
                min = j;
            }
        }
        await waitForSwap(data[min],i);
        await waitForSwap(data[i],min);
        let temp = data[min];
        data[min] = data[i];
        data[i] = temp;
    }
    toggleButtons();
};

async function insertSort(data){
    for(var i = 1; i < n; i++){
        var sorted = data[i];
        var j = i - 1;
        while(j >= 0 && data[j] > sorted){
            if(stop){
                toggleButtons();
                return stop=false;
            }
            await waitForSwap(data[j],j+1);
            data[j+1] = data[j];
            j--;
        }
        await waitForSwap(sorted,j+1);
        data[j+1] = sorted;
    }
    toggleButtons();
}

async function gnomeSort(data){
    var i = 0;

    while(i<data.length){
        if(stop){
            toggleButtons();
            return stop=false;
        }
        if(i==0){ i++; }
        if(data[i] >= data[i-1]){ i++; }
        else{
            await waitForSwap(data[i],i-1);
            await waitForSwap(data[i-1],i);
            let temp = data[i];
            data[i] = data[i-1];
            data[i-1] = temp;
            i--;
        }
    }
    toggleButtons();
}

async function oddEvenSort(data) {
    var flag = false;
    while(!flag){
        flag=true;
        for(var i = 1;i<=(data.length-2);i=i+2){
            if(stop){
                toggleButtons();
                return stop=false;
            }
            if(data[i]>data[i+1]){
                await waitForSwap(data[i],i+1);
                await waitForSwap(data[i+1],i);
                let temp = data[i];
                data[i] = data[i+1];
                data[i+1] = temp;
                flag = false;
            }
        }
        for(i=0;i<=(data.length - 2);i=i+2){
            if(stop){
                toggleButtons();
                return stop=false;
            }
            if(data[i]>data[i+1]){
                await waitForSwap(data[i],i+1);
                await waitForSwap(data[i+1],i);
                let temp = data[i];
                data[i] = data[i+1];
                data[i+1] = temp;
                flag = false;
            }
        }
    }
    toggleButtons();
}

async function doubleSelectSort(data){
    var i,j,k;
    for(i=0, j=(data.length-1); i < j; i++, j--){
        var min = data[i], max = data[i];
        var min_i = i, max_i = i;
        for(k=i;k<=j;k++){
            if(stop){
                toggleButtons();
                return stop=false;
            }
            if(data[k]>max){
                max = data[k];
                max_i = k;
            }
            else if(data[k]<min){
                min = data[k];
                min_i = k;
            }
        }
        await waitForSwap(data[min_i],i);
        await waitForSwap(data[i],min_i);
        let temp = data[i];
        data[i] = data[min_i];
        data[min_i] = temp;

        if(data[min_i] == max){
            await waitForSwap(data[min_i],j);
            await waitForSwap(data[j],min_i);
            let temp = data[j];
            data[j] = data[min_i];
            data[min_i] = temp;
        }else{
            await waitForSwap(data[max_i],j);
            await waitForSwap(data[j],max_i);
            let temp = data[j];
            data[j] = data[max_i];
            data[max_i] = temp;
        }
    }
    toggleButtons();
}

async function cocktailSort(data) {
    var swapped = true;
    var start = 0;
    var end = data.length;

    while(swapped==true){
        swapped = false;

        for(var i = start; i < end-1; ++i){
            if(stop){
                toggleButtons();
                return stop=false;
            }
            if(data[i]>data[i+1]){
                await waitForSwap(data[i+1],i);
                await waitForSwap(data[i],i+1);
                let temp = data[i];
                data[i] = data[i+1];
                data[i+1] = temp;
                swapped = true;
            }
        }
        if(swapped==false){ break; }

        swapped = false;
        end=end-1;

        for(var i = end - 1; i >= start; i--){
            if(stop){
                toggleButtons();
                return stop=false;
            }
            if(data[i]>data[i+1]){
                await waitForSwap(data[i],i+1);
                await waitForSwap(data[i+1],i);
                let temp = data[i];
                data[i] = data[i+1];
                data[i+1] = temp;
                swapped = true;
            }
        }
        start=start+1;
    }
    toggleButtons();
}

async function merge(data,start,mid,end){
    var start2 = mid + 1;
    if(data[mid]<=data[start2]){ return; }
    while(start <= mid && start2 <= end){
        if(data[start] <= data[start2]){
            start++;
        }else{
            var value = data[start2];
            var index = start2;
            while(index != start){
                if(stop){
                    return;
                }
                await waitForSwap(data[start],start2);
                await waitForSwap(data[index-1],index);
                data[index] = data[index-1];
                index--;
            }
            await waitForSwap(value,start);
            data[start] = value;
            start++;
            mid++;
            start2++;
        }
    }
}
async function mergeSort(data,l,r){
    if(stop){
        return;
    }
    if(l<r) {
        var m = parseInt(l + (r - l) / 2);
        await mergeSort(data, l, m);
        await mergeSort(data, m + 1, r);
        await merge(data, l, m, r);
    }
}
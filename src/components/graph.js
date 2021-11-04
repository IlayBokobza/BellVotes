class Graph {
    constructor(selector, data, propName, middle) {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with the selector of "${selector} was not found"`);
        }
        this.element = element;
        this.isMiddle = middle;
        //sort data
        data.sort((a, b) => {
            return a[propName] - b[propName];
        }).reverse();
        let newData = data.map(item => {
            return {
                height: 0,
                value: item[propName],
                name: item.title
            };
        });
        newData[0].height = this.element.clientHeight;
        newData.map((item, index) => {
            if (index === 0) {
                return item;
            }
            const percentage = item.value / newData[0].value * 100;
            item.height = this.element.clientHeight / 100 * percentage;
            return item;
        });
        this.data = newData;
    }
    
    middleSort() {
        const output = new Array(this.data.length);
        const mid = Math.floor(this.data.length / 2);
        let offset = 1;
        this.data.forEach((item, index) => {
            if (index == 0) {
                output[mid] = item;
                return;
            }
            if (index % 2 === 0) {
                output[mid + offset] = item;
                offset++;
            }
            else {
                output[mid - offset] = item;
            }
        });
        return output;
    }
    
    draw() {
        const data = (this.isMiddle) ? this.middleSort() : this.data;
        this.element.innerHTML = '';
        data.forEach((i) => {
            this.element.innerHTML += `<div class="graph__col-container"><span class="graph__text">${i.name}</span><div class="graph__col" style="height:${i.height}px"></div></div>`;
        });
    }
}

export default Graph;
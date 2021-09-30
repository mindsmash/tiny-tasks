
export class Common {
    static setMinDate() {
        var minDate = new Date();
        minDate.setDate(minDate.getDate() - 1);
        return minDate
      }
    
}
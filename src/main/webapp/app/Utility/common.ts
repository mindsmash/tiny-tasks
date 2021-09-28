
export class Common {
    static setMinDate() {
        const now = new Date();
        var minDate = new Date();
        minDate.setDate(now.getDate() - 1);
        return minDate
      }
    
}
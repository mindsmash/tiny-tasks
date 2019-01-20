export class Task { 
    private _status : Status;
    constructor (private _name: string) {
        this._status = Status.Created;
    }
    public getName() : string { 
      return this._name;
    }
    public getIsFinished() : Status {
      return this._status;
    }
    public finishTask() : void {
        this._status = Status.Done;
    }
    public startTask() : void{
        this._status = Status.InProgress;
    }
    public compareStatus(status:string) : boolean{
        if(!status || this._status == status){
            return true;
        }
    }
}

 enum Status {
     Created = "Created",
     InProgress = "InProgress",
     Done = "Done"
 }
export interface Master {
    masterGroupName: String;
    masterId:number
    masterFields:MasterField[]

}

interface MasterField {
    masterFieldId: number;
    fieldName:String
    masterValues:MasterValue[]

}

interface MasterValue {
    ll2: any;
    ll3: any;
    ll4: any;
    ll5: any;
    masterValueId:number;
    fieldValue: String
    
}




import { gql } from "apollo-angular";

const GET_REGION = gql`
query getMasterGroupDetails($groupName: String){
    masterByGroupName(groupName: $groupName){
        masterId
        masterGroupName
        masterFields{
            masterFieldId
            fieldName
        }
    }
}
`;

const GET_POSITION_TYPE= gql`
query getMasterGroupDetails($groupName: String){
    masterByGroupName(groupName: $groupName){
        masterId
        masterGroupName
        masterFields{
            masterFieldId
            fieldName
        }
    }
}
`;

const GET_BUSINESS_UNIT= gql`
query getMasterGroupDetails($groupName: String){
    masterByGroupName(groupName: $groupName){
        masterId
        masterGroupName
        masterFields{
            masterFieldId
            fieldName
            masterValues{
                masterValueId
                fieldValue
            }
        }
    }
}
`;

const GET_MANAGER= gql`
query getMasterGroupDetails($groupName: String){
    masterByGroupName(groupName: $groupName){
        masterId
        masterGroupName
        masterFields{
            masterFieldId
            fieldName
            masterValues{
                masterValueId
                ll2
                ll3
                ll4
                ll5
            }
        }
    }
}
`;


export { GET_REGION, GET_POSITION_TYPE, GET_BUSINESS_UNIT, GET_MANAGER };

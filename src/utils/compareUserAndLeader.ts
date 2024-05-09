export function compareUserAndLeader(currentUserId: number, adminId: number, leaderId: number) {
    //작성자의 id 와 모임장의 id 비교하기 위한 상태
    if (currentUserId === adminId) {
        return true;
    } else if (currentUserId === leaderId) {
        return true;
    } else if (currentUserId !== leaderId) {
        return false;
    } else return false;

}
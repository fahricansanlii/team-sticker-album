import { TeamMember } from 'store/models/team-member.model';
import { getTeamMember, getTotalTeamMembersCount } from './team.api';

let availableStickers: number[] = [];
let availableStickersAreGenerated = false;

export async function generateStickerSet() {
    const totalTeamMembersCount = await getTotalTeamMembersCount();
    generateAvailableStickers(totalTeamMembersCount);

    let numOfAvailableStickers = availableStickers.length;
    const idsOfTeamMembers: Array<number> = [];
    const howManyTeamMembersToReveal = Math.min(6, numOfAvailableStickers);
    for (let i = 0; i < howManyTeamMembersToReveal; i++) {
        const randomIndex = Math.floor(Math.random() * numOfAvailableStickers);
        const teamMemberId = availableStickers[randomIndex];
        idsOfTeamMembers.push(teamMemberId);
        availableStickers.splice(randomIndex, 1);
        numOfAvailableStickers = availableStickers.length;
    }
    const teamMembersToReveal: Promise<TeamMember>[] = idsOfTeamMembers.map((id) => {
        return getTeamMember(Math.floor((id - 1) / 10) + 1, id);
    });
    return Promise.all(teamMembersToReveal);
}

function generateAvailableStickers(amount: number) {
    if (availableStickersAreGenerated) return;

    availableStickersAreGenerated = true;
    for (let i = 1; i <= amount; i++) {
        availableStickers.push(i);
    }
}

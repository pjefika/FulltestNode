export class AppLevelAlert {
    type: string;
    msg: string;
    btn?: {
        btnName: string;
        btnAction: string;
        link?: string;
        component?: any; // Não há necessidade, quando tiver pensar como fazer... =)
    }
}
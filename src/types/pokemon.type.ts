export type Pokemon = {
    id: string;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    stats: [
        {
            base_stat: number,
            effort: number,
            stat: {
                name: string,
            },
        },
    ];
    types: [
        {
           type: {
            name: string,
           } 
        }
    ];
};


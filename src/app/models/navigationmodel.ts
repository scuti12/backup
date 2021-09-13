export class Navigationmodel 
{
    public SMenuID: number;
    public SMenuName: string;
    public PSMenuID: number;
    public SModID: number;
    public SUsr: string;
    public SMenuIcon: string;
    public IsAccept: number;
    public OrderVal: number;
    public SMenuIcSModUrlon: string;
    public children?: Navigationmodel[];
    public isopen?:boolean=false;
}

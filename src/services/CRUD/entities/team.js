export default class Team {
    constructor(data) {
        if (data.activeCompetitions) {
            this.activeCompetitions = data.activeCompetitions;
        }
        if (data.squad) {
            this.squad = data.squad;
        }
        this.id = data.id;
        this.area = data.area;
        this.name = data.name;
        this.shortName = data.shortName;
        this.tla = data.tla;
        this.crestUrl = data.crestUrl;
        this.address = data.address;
        this.phone = data.phone;
        this.website = data.website;
        this.email = data.email;
        this.founded = data.founded;
        this.clubColors = data.clubColors;
        this.venue = data.venue;
        this.lastUpdated = data.lastUpdated;
    }
}
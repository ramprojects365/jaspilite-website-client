export class AdminUser {
    public adminId: number;
    public displayName: string;
    public userType: string;
    public email: string;
    private token: string;
    public refreshToken: string;
    public tokenExpirationDate: Date;
    constructor(user: any, token: string, refreshToken: string, expirationDate: Date) {
        this.adminId = user.admin_id || user.adminId;
        this.displayName = user.display_name || user.displayName;
        this.userType = user.user_type || user.userType;
        this.email = user.email;
        this.token = token;
        this.refreshToken = refreshToken;
        this.tokenExpirationDate = expirationDate;
    }

    get getToken() {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }
        return this.token;
    }
}

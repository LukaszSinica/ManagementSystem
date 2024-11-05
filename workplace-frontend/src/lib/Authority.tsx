export const Authorities: { [key: string]: string } = {
    "ADMINISTRATOR": "ROLE_ADMINISTRATOR",
    "USER": "ROLE_USER",
};

export const namedAuthorities: { [key: string]: string } = {
    "ADMINISTRATOR": "admin",
    "USER": "user"
}

export function getAuthority(authority: string) {
    const key = Object.keys(Authorities).find(key => Authorities[key] === authority);
    return key ? namedAuthorities[key] : undefined
}
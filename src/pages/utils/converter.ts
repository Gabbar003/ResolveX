export function extractRepoOwnerAndIssue(url: string) {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)\/issues\/(\d+)/;
    const match = url.match(regex);
    if (match) {
        const owner = match[1];
        const repo = match[2];
        const issueNumber = match[3];
        return { owner, repo, issueNumber };
    } else {
        return null;
    }
}


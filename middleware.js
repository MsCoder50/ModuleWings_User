
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";


const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
});

export async function proxy(request) {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

    const clientIp = ip.split(",")[0].trim();

    const { success, limit, remaining, reset } = await ratelimit.limit(`api_rate_limit:${clientIp}`);

    if (!success) {
        return new NextResponse("Too Many Requests.", {
            status: 429,
            headers: {
                "X-RateLimit-Limit": limit.toString(),
                "X-RateLimit-Remaining": remaining.toString(),
                "X-RateLimit-Reset": reset.toString(),
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*"],
};

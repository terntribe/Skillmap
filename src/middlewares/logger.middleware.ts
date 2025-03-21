// src/middlewares/logger.middleware.ts
import { Request, Response, NextFunction } from 'express';

const getClientIp = (req: Request): string => {
    return req.ip || 
            req.headers['x-forwarded-for']?.toString() || 
            req.headers['x-real-ip']?.toString() || 
            req.socket.remoteAddress || 
            'unknown';
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();
    const ip = getClientIp(req);
    
    // Capture response finish event
    res.on('finish', () => {
        const durationInMs = getDurationInMilliseconds(start);
        const logData = {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${durationInMs}ms`,
        ip: ip,
        timestamp: new Date().toISOString()
        };
        
        console.log(
        `${logData.timestamp} - ${logData.ip} - ${req.method} ${req.path} - ` +
        `Status: ${logData.status} - Duration: ${logData.duration}`
        );
    });

    next();
};

const getDurationInMilliseconds = (start: [number, number]) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    return Math.round((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS);
};
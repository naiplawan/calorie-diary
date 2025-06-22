'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-background spotify-scrollbar flex items-center justify-center">
      <div className="spotify-container max-w-2xl">
        <motion.div className="text-center space-y-8" variants={staggerContainer} initial="hidden" animate="visible">
          {/* Error Icon */}
          <motion.div variants={fadeIn} className="spotify-flex-center">
            <div className="w-32 h-32 rounded-full bg-destructive/10 spotify-flex-center">
              <AlertTriangle className="w-16 h-16 text-destructive" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={fadeIn} className="space-y-4">
            <h1 className="spotify-text-hero text-4xl lg:text-5xl">Oops! Something went wrong</h1>
            <p className="spotify-text-body text-xl max-w-md mx-auto">
              We encountered an unexpected error. Don't worry, we're on it!
            </p>
          </motion.div>

          {/* Error Details Card */}
          <motion.div variants={fadeIn}>
            <Card className="spotify-card text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Error Details
                </CardTitle>
                <CardDescription>Technical information about what went wrong</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <p className="text-sm font-mono text-destructive break-all">
                    {error.message || 'An unexpected error occurred'}
                  </p>
                  {error.digest && <p className="text-xs text-muted-foreground mt-2">Error ID: {error.digest}</p>}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={fadeIn} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} className="spotify-button flex items-center gap-2" size="lg">
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Button>

              <Button variant="outline" asChild size="lg" className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Home className="w-5 h-5" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>

            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link href="javascript:history.back()">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Link>
            </Button>
          </motion.div>

          {/* Help Section */}
          <motion.div variants={fadeIn}>
            <Card className="spotify-card-compact">
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <h3 className="font-semibold text-foreground">Need Help?</h3>
                  <p className="text-sm spotify-text-body">
                    If this error persists, please contact our support team with the error ID above.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center text-sm">
                    <span className="spotify-text-small">
                      Common causes: Network issues, server maintenance, or temporary glitches
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

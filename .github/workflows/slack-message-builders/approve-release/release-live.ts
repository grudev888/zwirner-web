import {Command} from "commander";

const program = new Command();
program
  .requiredOption("--releaseVersion <value>")
  .requiredOption("--deploymentUrl <value>")
  .requiredOption("--ghReleaseUrl <value>")
  .parse(process.argv);
const values = program.opts() as Args;
const message: string = buildMessage(values);
console.log(message);

/**
 * CLI arguments provided to [build the Slack message]{@link buildMessage}.
 */
interface Args {
  /**
   * Release version.
   */
  releaseVersion: string;

  /**
   * Production Vercel deployment URL.
   */
  deploymentUrl: string;

  /**
   * GitHub release URL.
   */
  ghReleaseUrl: string;
}

/**
 * Fills blank spaces in the Slack message template with the provided arguments.
 */
function buildMessage(args: Args): string {
  const message = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `🔥 Release ${args.releaseVersion} is now live`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Check it out",
            },
            style: "primary",
            url: args.deploymentUrl,
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Learn more about changes",
            },
            url: args.ghReleaseUrl,
          },
        ],
      },
    ],
  };
  return JSON.stringify(message);
}

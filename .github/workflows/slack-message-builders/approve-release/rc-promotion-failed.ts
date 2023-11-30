// @ts-ignore
const { Command } = require("commander");

const program = new Command();
program
  .requiredOption("--releaseVersion <value>")
  .requiredOption("--failedRunDetails <value>")
  .parse(process.argv);
const args = program.opts() as Args;
const message: string = buildMessage(args);
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
   * Link to the failed GitHub workflow run.
   */
  failedRunDetails: string;
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
          text: `😨 Promoting ${args.releaseVersion} to production failed`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Why did it fail?",
            },
            url: args.failedRunDetails,
          },
        ],
      },
    ],
  };
  return JSON.stringify(message);
}

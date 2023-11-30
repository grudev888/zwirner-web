import {Command} from "commander";

const program = new Command();
program
  .requiredOption("--releaseVersion <value>")
  .requiredOption("--failedRunDetails <value>")
  .parse(process.argv);
const values = program.opts() as Placeholders;
const message: string = buildMessage(values);
console.log(message);

/**
 * CLI arguments provided to [build the Slack message]{@link buildMessage}.
 */
interface Placeholders {
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
function buildMessage(args: Placeholders): string {
  const message = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `😔 Release candidate ${args.releaseVersion} failed to deploy`,
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

import {Command} from "commander";

const program = new Command();
program
  .requiredOption("--releaseVersion <value>")
  .requiredOption("--deploymentUrl <value>")
  .requiredOption("--ghReleaseUrl <value>")
  .requiredOption("--promoteUrl <value>")
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
   * Release Vercel deployment URL.
   */
  deploymentUrl: string;

  /**
   * GitHub release URL.
   */
  ghReleaseUrl: string;

  /**
   * The URL to promote the release candidate to production.
   */
  promoteUrl: string;
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
          text: `🌟 New release candidate ${args.releaseVersion} arrived`,
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
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Promote to production",
            },
            style: "danger",
            url: args.promoteUrl,
            confirm: {
              title: {
                type: "plain_text",
                text: "Are you sure?",
              },
              text: {
                type: "plain_text",
                text:
                  "Ensure that QA, product team and managers approve " +
                  "this release candidate. After confirming the action, " +
                  "you will be taken to the GitHub Release editor. You must uncheck " +
                  '"Set as a pre-release" and publish the release. ' +
                  "May the Force be with you 🌌",
              },
              confirm: {
                type: "plain_text",
                text: "I am sure",
              },
              deny: {
                type: "plain_text",
                text: "Stop, I've changed my mind!",
              },
            },
          },
        ],
      },
    ],
  };
  return JSON.stringify(message);
}

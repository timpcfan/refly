import { chatHistoryReminder } from '../common/chat-history';
import { buildLocaleFollowInstruction } from '../common/locale-follow';
import {
  buildQueryIntentAnalysisInstruction,
  buildCurrentTimeInfo,
} from '../../utils/common-prompt';
import { buildFormatDisplayInstruction } from '../common/format';
import {
  buildSimpleDetailedExplanationInstruction,
  buildCustomProjectInstructionsForUserPrompt,
} from '../common/personalization';

export const buildNoContextCommonQnASystemPrompt = () => {
  return `You are Refly, an AI assistant.

${buildCurrentTimeInfo()}

Answer the user's question directly and concisely. If you are unsure, say so.`;
};

export const buildContextualCommonQnASystemPrompt = () => {
  return `You are Refly, an AI assistant.

${buildCurrentTimeInfo()}

Use the provided context only when it helps answer the question. If the context is irrelevant, ignore it and respond directly.`;
};

export const buildCommonQnASystemPrompt = (_locale: string, needPrepareContext: boolean) => {
  if (!needPrepareContext) {
    return buildNoContextCommonQnASystemPrompt();
  }
  return buildContextualCommonQnASystemPrompt();
};

export const buildCommonQnAUserPrompt = ({
  originalQuery,
  optimizedQuery,
  rewrittenQueries,
  locale,
  customInstructions,
}: {
  originalQuery: string;
  optimizedQuery: string;
  rewrittenQueries: string[];
  locale: string;
  customInstructions?: string;
}) => {
  let prompt = '';

  if (originalQuery === optimizedQuery) {
    prompt = `## User Query
    ${originalQuery}

    ## Important
    ${chatHistoryReminder()}

    ## Hint
    ${buildLocaleFollowInstruction(locale)}

    ${buildFormatDisplayInstruction()}
    ${buildSimpleDetailedExplanationInstruction()}
    `;
  } else {
    prompt = `## User Query

### Original User Query
${originalQuery}

### Optimized User Query
${optimizedQuery}

### Rewritten User Queries
${rewrittenQueries.join('\n')}

${buildQueryIntentAnalysisInstruction()}


## Important
${chatHistoryReminder()}

## Hint
${buildLocaleFollowInstruction(locale)}
`;
  }

  // Add custom instructions to user prompt if available
  if (customInstructions) {
    prompt += `\n${buildCustomProjectInstructionsForUserPrompt(customInstructions)}`;
  }

  return prompt;
};

export const buildCommonQnAContextUserPrompt = (context: string, needPrepareContext: boolean) => {
  if (!needPrepareContext) {
    return '';
  }

  return `
<context>
${context}
</context>
`;
};

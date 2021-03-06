import '../prism.less';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import {
	ContentWrapper,
	DesktopHeader,
	FlexWrapper,
	Layout,
	MenuButton,
	MobileHeader,
	ResponsiveSidebar,
} from 'gatsby-theme-apollo-core';
import React, { useRef } from 'react';

import CodeBlock from './code-block';
import LogoTitle from './logo-title';
import { MDXProvider } from '@mdx-js/react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import Nav from './nav';
import PageContent from './page-content';
import PageHeader from './page-header';
import PropTypes from 'prop-types';
import SEO from './seo';
import Search from './search';
import SelectLink from './select-link';
import Sidebar from './sidebar';
import SidebarContent from './sidebar-content';
import { TypescriptApiBoxContext } from './typescript-api-box';
import Wrapper from './wrapper';
import { graphql } from 'gatsby';
import rehypeReact from 'rehype-react';
import styled from '@emotion/styled';

const StyledLogoTitle = styled(LogoTitle)({
	marginRight: 'auto',
});

const Main = styled.main({
	flexGrow: 1,
	outline: 'none',
	overflowY: 'auto',
	WebkitOverflowScrolling: 'touch',
});

const StyledContentWrapper = styled(ContentWrapper)({
	paddingBottom: 0,
});

const components = {
	pre: CodeBlock,
};

const renderAst = new rehypeReact({
	createElement: React.createElement,
	components,
}).Compiler;

export default function Template(props) {
	const mainRef = useRef(null);

	function isPathActive(value) {
		return !props.location.pathname.indexOf(value);
	}

	const { hash, pathname } = props.location;
	const { file, site } = props.data;
	const { frontmatter, headings } = file.childMarkdownRemark || file.childMdx;
	const { title, description, subtitle, twitterHandle } = site.siteMetadata;
	const {
		sidebarContents,
		githubUrl,
		spectrumPath,
		typescriptApiBox,
		versions,
		defaultVersion,
		algoliaApiKey,
		algoliaIndexName,
		navItems,
		baseUrl,
	} = props.pageContext;

	const pages = sidebarContents
		.reduce((acc, { pages }) => acc.concat(pages), [])
		.filter(page => !page.anchor);

	return (
		<Wrapper>
			<Layout>
				<SEO
					title={frontmatter.title}
					description={frontmatter.description || description}
					siteName={title}
					twitterHandle={twitterHandle}
					baseUrl={baseUrl}
				/>
				<ResponsiveSidebar>
					{({ sidebarRef, onWrapperClick, openSidebar, sidebarOpen }) => (
						<FlexWrapper onClick={onWrapperClick}>
							<Sidebar
								responsive
								open={sidebarOpen}
								ref={sidebarRef}
								title={title}
							>
								<SidebarContent
									title={subtitle}
									pathname={pathname}
									contents={sidebarContents}
									versions={versions}
									defaultVersion={defaultVersion}
									isPathActive={isPathActive}
								/>
							</Sidebar>
							<Main ref={mainRef} tabIndex={0}>
								<MobileHeader>
									<MenuButton onClick={openSidebar} />
									<StyledLogoTitle />
									<SelectLink options={navItems} isPathActive={isPathActive} />
								</MobileHeader>
								<DesktopHeader>
									{algoliaApiKey && (
										<Search
											title={title}
											apiKey={algoliaApiKey}
											indexName={algoliaIndexName}
										/>
									)}

									<Nav
										items={navItems}
										pathname={pathname}
										isPathActive={isPathActive}
									/>
								</DesktopHeader>
								<StyledContentWrapper>
									<PageHeader {...frontmatter} />
									<hr />
									<PageContent
										title={frontmatter.title}
										pathname={pathname}
										pages={pages}
										headings={headings}
										hash={hash}
										githubUrl={githubUrl}
										spectrumPath={spectrumPath}
										mainRef={mainRef}
									>
										{file.childMdx ? (
											<TypescriptApiBoxContext.Provider
												value={typescriptApiBox}
											>
												<MDXProvider components={components}>
													<MDXRenderer>{file.childMdx.body}</MDXRenderer>
												</MDXProvider>
											</TypescriptApiBoxContext.Provider>
										) : (
											renderAst(file.childMarkdownRemark.htmlAst)
										)}
									</PageContent>
								</StyledContentWrapper>
							</Main>
						</FlexWrapper>
					)}
				</ResponsiveSidebar>
			</Layout>
		</Wrapper>
	);
}

Template.propTypes = {
	data: PropTypes.object.isRequired,
	pageContext: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
	query PageQuery($id: String) {
		site {
			siteMetadata {
				title
				description
				subtitle
			}
		}
		file(id: { eq: $id }) {
			childMarkdownRemark {
				frontmatter {
					title
					description
				}
				headings(depth: h2) {
					value
				}
				htmlAst
			}
			childMdx {
				frontmatter {
					title
					description
				}
				headings(depth: h2) {
					value
				}
				body
			}
		}
	}
`;

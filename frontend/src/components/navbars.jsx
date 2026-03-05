import React, { useState, useContext, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OutcomeContext from '../OutcomeContext';
import Content from './content';
import ProgressIndicator from './progressIndicator';
import {ReactComponent as VerticalNavImg} from '../assets/vertical-version1.svg';
import ClosureTrianglePng from '../assets/closure-triangle.jpg';
import focusRolesSvg from '../assets/focus-roles.svg';
import focusBottleneckSvg from '../assets/focus-bottleneck.svg';

// Apply dark-highlight + white text to the active wheel section
function applyWheelHighlight(svgEl, selectedItem) {
  svgEl.querySelectorAll('g[id]').forEach(g => {
    if (!g.id.startsWith('role_') && !g.id.startsWith('bottleneck_')) return;
    const isActive = g.id === selectedItem;
    g.style.opacity = isActive ? '1' : '0.35';
    const mainPath = g.querySelector('path');
    if (mainPath) {
      mainPath.style.fill = isActive
        ? (g.id.startsWith('role_') ? '#d64c64' : '#3a80ac')
        : '';
    }
    g.querySelectorAll('text, tspan').forEach(t => {
      t.style.fill = isActive ? '#ffffff' : '';
    });
  });
}

function VerticalNavbarPermanent() {
  const [selectedItem, setSelectedItem] = useState('outcome');
  const { outcome } = useContext(OutcomeContext);
  const contentRef = useRef();
  const wheelDivRef = useRef();
  const wheelSvgRef = useRef(null);
  const currentSrcRef = useRef(null);

  useEffect(() => {
    const outcomeReact = document.getElementsByClassName('clickable outcome');
    if (!outcomeReact) return;
    for (let elem of outcomeReact) {
      elem.classList.add('selected');
    }
  }, []);

  // Step → SVG component IDs to highlight in the main diagram
  const STEP_HIGHLIGHTS = {
    outcome:    ['development-outcomes'],
    results:    ['public-sector-results'],
    challenges: ['challenges'],
    policy:     ['public-policy', 'fiscal-policy-pfm', 'institutions'],
    role:       ['left-question'],
    bottleneck: ['right-question'],
  };

  const ALL_COMPONENTS = [
    'development-outcomes', 'public-sector-results', 'challenges',
    'public-policy', 'fiscal-policy-pfm', 'institutions',
    'left-question', 'right-question',
  ];

  const POLICY_COMPONENTS = ['public-policy', 'fiscal-policy-pfm', 'institutions'];

  // Keep main SVG highlighting + wheel in sync with selectedItem
  useEffect(() => {
    const key = selectedItem.startsWith('role') ? 'role'
              : selectedItem.startsWith('bottleneck') ? 'bottleneck'
              : selectedItem;

    const toHighlight = STEP_HIGHLIGHTS[key] || [];

    ALL_COMPONENTS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (toHighlight.includes(id)) {
        el.classList.add('highlighted');
        el.classList.remove('dimmed');
      } else {
        el.classList.add('dimmed');
        el.classList.remove('highlighted');
      }
    });

    const focusSrc = key === 'role' ? focusRolesSvg
                   : key === 'bottleneck' ? focusBottleneckSvg
                   : null;

    let cancelled = false;

    if (focusSrc) {
      // Hide policy area in the main diagram (wheel shown separately below)
      POLICY_COMPONENTS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.visibility = 'hidden';
      });

      // If the same wheel SVG is already loaded, just re-apply highlighting
      if (wheelSvgRef.current && currentSrcRef.current === focusSrc) {
        applyWheelHighlight(wheelSvgRef.current, selectedItem);
      } else {
        // Remove old wheel (switching between roles / bottlenecks)
        if (wheelSvgRef.current) {
          wheelSvgRef.current.remove();
          wheelSvgRef.current = null;
        }
        currentSrcRef.current = focusSrc;

        fetch(focusSrc)
          .then(r => r.text())
          .then(svgText => {
            if (cancelled) return;
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, 'image/svg+xml');
            const innerSvg = doc.querySelector('svg');
            const container = wheelDivRef.current;
            if (!innerSvg || !container) return;

            // Build a standalone SVG; width=100%, height=auto so it scales
            // proportionally (square) and fills the container width with no
            // top/bottom letterboxing — overflow is clipped by the container.
            const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgEl.setAttribute('viewBox', '0 0 936 936');
            svgEl.style.width = '100%';
            svgEl.style.height = '100%';
            svgEl.style.display = 'block';

            Array.from(innerSvg.childNodes).forEach(child => {
              svgEl.appendChild(child.cloneNode(true));
            });

            container.appendChild(svgEl);
            wheelSvgRef.current = svgEl;

            applyWheelHighlight(svgEl, selectedItem);

            // Click to navigate between sub-steps
            svgEl.style.cursor = 'pointer';
            svgEl.addEventListener('click', (e) => {
              const target = e.target.closest('g[id]');
              if (!target) return;
              const id = target.id;
              if (id.startsWith('role_') || id.startsWith('bottleneck_')) {
                setSelectedItem(id);
                if (contentRef.current) {
                  contentRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }
            });
          });
      }
    } else {
      // Restore policy area in main diagram and clean up any wheel
      POLICY_COMPONENTS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.visibility = '';
      });
      if (wheelSvgRef.current) {
        wheelSvgRef.current.remove();
        wheelSvgRef.current = null;
      }
      currentSrcRef.current = null;
    }

    return () => { cancelled = true; };
  }, [selectedItem]);

  const isWheelMode = selectedItem.startsWith('role') || selectedItem.startsWith('bottleneck');

  return (
    <Container fluid style={{ flex: 1, minHeight: 0, padding: 0, overflow: 'hidden' }} className="d-flex flex-column">
      <ProgressIndicator selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <Row className="flex-grow-1" style={{ minHeight: 0, height: '100%' }}>

        {/* Sidebar Column */}
        <Col xs={12} md={4} lg={4}
          className="bg-paper d-flex flex-column"
          style={{ height: '100%', overflow: 'hidden' }}
        >
          {selectedItem === 'closure' ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
              <img
                src={ClosureTrianglePng}
                alt="Reform triangle diagram"
                style={{ width: '100%', objectFit: 'contain' }}
              />
            </div>
          ) : (
            <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
              {/* Main framework diagram — top 30% in wheel mode, full height otherwise */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: isWheelMode ? '40%' : '100%',
                overflow: 'hidden',
              }}>
                <VerticalNavImg
                  preserveAspectRatio="xMidYMin meet"
                  {...(isWheelMode ? { viewBox: '0 4070 19050 14000' } : {})}
                  style={{ display: 'block', width: '100%', height: '100%' }}
                />
              </div>

              {/* Focus wheel — bottom 70%, starts right where diagram ends */}
              {isWheelMode && (
                <div
                  ref={wheelDivRef}
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                    padding: '4px 8px 8px',
                  }}
                />
              )}
            </div>
          )}
        </Col>

        {/* Content Column */}
        <Col xs={12} md={8} lg={8} style={{ height: '100%', overflowY: 'auto' }}>
          <Content contentRef={contentRef} outcome={outcome} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </Col>
      </Row>
    </Container>
  );
}

export default VerticalNavbarPermanent;

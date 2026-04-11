// Bible College of India - Professional Branding with Dual Signatures & Ranking
(function() {
    'use strict';

    if (typeof STUDENT_DATA === 'undefined') {
        console.error('STUDENT_DATA is not defined. Make sure student-data.js is loaded first.');
        return;
    }

    // --- 1. INITIALIZATION ---
    function init() {
        setTimeout(() => {
            if (window.studentEmail === 'jlibiblecollege@gmail.com' && document.getElementById('adminDashboard')) {
                if (document.getElementById('adminDashboard').style.display !== 'block') {
                    window.showAdminDashboard();
                }
            }
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // --- 2. GLOBAL EXPOSURE ---
    window.addAdditionalButtons = function() {
        const studentInfo = document.querySelector('.student-info');
        if (!studentInfo || document.getElementById('marksheetBtn')) return;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'header-actions';
        buttonsContainer.style.cssText = `display: flex; gap: 10px; align-items: center; flex-wrap: wrap;`;

        const profileBtn = createButton('profileBtn', '👤 Student Profile', '#667eea', '#764ba2');
        profileBtn.onclick = () => window.showStudentProfile(window.studentEmail);

        const marksheetBtn = createButton('marksheetBtn', '📊 View Marksheet', '#f093fb', '#f5576c');
        marksheetBtn.onclick = () => window.showMarksheet(window.studentEmail);

        buttonsContainer.appendChild(profileBtn);
        buttonsContainer.appendChild(marksheetBtn);

        const logoutBtn = studentInfo.querySelector('.logout-btn');
        if (logoutBtn) studentInfo.insertBefore(buttonsContainer, logoutBtn);
        else studentInfo.appendChild(buttonsContainer);
    };

    function createButton(id, text, color1, color2) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.innerHTML = text;
        btn.style.cssText = `
            padding: 10px 20px;
            background: linear-gradient(135deg, ${color1} 0%, ${color2} 100%);
            color: white; border: none; border-radius: 8px; cursor: pointer;
            font-size: 0.9em; font-weight: 600; transition: all 0.3s;
            text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;
        `;
        return btn;
    }

    window.showMarksheet = function(email) {
        if (!email) return;
        const studentMarksData = STUDENT_DATA.marks[email];
        const studentProfileData = STUDENT_DATA.profiles[email];

        if (!studentMarksData) {
            alert('No marksheet data available.');
            return;
        }

        window.hideAllContentSections();
        let marksheetSection = document.getElementById('marksheetSection');
        if (!marksheetSection) {
            marksheetSection = createMarksheetSection();
            document.querySelector('.container').appendChild(marksheetSection);
        }

        populateMarksheet(studentMarksData, studentProfileData, email);
        marksheetSection.style.display = 'block';
    };

    window.showStudentProfile = function(email) {
        const data = STUDENT_DATA.profiles[email];
        if (!data) return;
        window.hideAllContentSections();

        let section = document.getElementById('profileSection');
        if (!section) {
            section = document.createElement('div');
            section.id = 'profileSection';
            section.style.cssText = 'padding: 20px; display: none;';
            document.querySelector('.container').appendChild(section);
        }

        section.innerHTML = `
            <div style="max-width: 1000px; margin: 0 auto;">
                <button onclick="window.backToDashboardFromProfile()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 20px; font-weight: bold;">⬅ BACK TO DASHBOARD</button>

                <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #eee; padding-bottom: 20px;">
                    <h1 style="margin: 0; font-size: 2.2em; color: #1e3c72; font-family: 'Arial Black', Gadget, sans-serif; text-transform: uppercase; line-height: 1.2;">BIBLE COLLEGE OF INDIA PASTORS FOUNDATION</h1>
                    <p style="margin: 8px 0 0 0; font-size: 1em; color: #555; font-weight: 600;">(AFFILIATED TO JESUS LOVES INDIA CHURCH FOUNDATION)</p>
                </div>

                <div style="background: #00aeef; color: white; padding: 30px 20px; text-align: center; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="font-size: 3em; margin-bottom: 10px;">👤</div>
                    <h2 style="margin: 0; font-size: 2.2em; font-family: 'Times New Roman', serif;">Student Profile</h2>
                    <h3 style="margin: 15px 0 5px 0; font-weight: normal; font-size: 1.6em;">${data.name}</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 1.1em;">${email}</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; margin-bottom: 30px;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border-left: 10px solid #4caf50; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <h3 style="color: #1e3c72; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 15px; font-size: 1.5em;">Personal Information</h3>
                        <div style="line-height: 2.5; font-size: 1.05em;">
                            <p>📍 <strong>Address:</strong> <span style="float: right;">${data.address}</span></p>
                            <p>📱 <strong>Mobile:</strong> <span style="float: right;">${data.mobile}</span></p>
                            <p>📅 <strong>DOB:</strong> <span style="float: right;">${data.dob || 'N/A'}</span></p>
                            <p>🔢 <strong>Age:</strong> <span style="float: right;">${data.age || 'N/A'}</span></p>
                            <p>⚧ <strong>Gender:</strong> <span style="float: right;">${data.gender || 'N/A'}</span></p>
                            <p>🎓 <strong>Education:</strong> <span style="float: right;">${data.education || 'N/A'}</span></p>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px; border-left: 10px solid #ff9800; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <h3 style="color: #1e3c72; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 15px; font-size: 1.5em;">Church Information</h3>
                        <div style="line-height: 2.5; font-size: 1.05em;">
                            <p>⛪ <strong>Church:</strong> <span style="float: right;">${data.church}</span></p>
                            <p>👨‍💼 <strong>Pastor:</strong> <span style="float: right;">${data.pastor}</span></p>
                            <p>👤 <strong>Ref 1:</strong> <span style="float: right;">${data.reference1 || 'N/A'}</span></p>
                            <p>👤 <strong>Ref 2:</strong> <span style="float: right;">${data.reference2 || 'N/A'}</span></p>
                        </div>
                    </div>
                </div>

                <div style="background: white; padding: 25px; border-radius: 12px; border-left: 10px solid #9c27b0; box-shadow: 0 5px 15px rgba(0,0,0,0.08); width: 100%; margin-bottom: 30px;">
                    <h3 style="color: #1e3c72; margin-top: 0; font-size: 1.5em;">Your Future plan for god's work / देवाच्या कार्यासाठी तुमची भविष्यातील योजना</h3>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                    <p style="font-size: 1.1em; color: #444; white-space: pre-wrap; line-height: 1.6;">${data.futurePlan || 'No information provided.'}</p>
                </div>
            </div>
        `;
        section.style.display = 'block';
    };

    window.downloadMarksheet = function() {
        const element = document.getElementById('marksheet-to-print');
        const name = document.getElementById('marksheet-student-name').textContent;
        const btn = document.getElementById('downloadBtn');
        btn.innerText = "⌛ Processing...";

        window.scrollTo(0, 0);

        const opt = {
            margin: [5, 5, 5, 5],
            filename: `Marksheet_${name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerText = "📥 DOWNLOAD PDF";
        });
    };

    window.backToDashboardFromMarksheet = function() {
        document.getElementById('marksheetSection').style.display = 'none';
        if (window.studentEmail === 'jlibiblecollege@gmail.com') window.showAdminDashboard();
        else document.getElementById('pdfSelection').style.display = 'block';
    };

    window.backToDashboardFromProfile = function() {
        document.getElementById('profileSection').style.display = 'none';
        if (window.studentEmail === 'jlibiblecollege@gmail.com') window.showAdminDashboard();
        else document.getElementById('pdfSelection').style.display = 'block';
    };

    window.showAdminDashboard = function() {
        window.hideAllContentSections();
        const dash = document.getElementById('adminDashboard');
        if (!dash) return;
        dash.style.display = 'block';
        const list = document.getElementById('studentList');
        list.innerHTML = '';
        Object.keys(STUDENT_DATA.profiles).filter(e => e !== 'jlibiblecollege@gmail.com').forEach(email => {
            const p = STUDENT_DATA.profiles[email];
            const card = document.createElement('div');
            card.style.cssText = `
                background: white; padding: 20px; margin-bottom: 15px;
                border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);
                display: flex; flex-direction: column; align-items: center;
                text-align: center; border: 1px solid #eee;
            `;
            card.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong style="font-size: 1.1em; color: #1e3c72; display: block; margin-bottom: 2px;">${p.name}</strong>
                    <small style="color: #666; font-size: 0.85em;">${email}</small>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 160px;">
                    <button onclick="window.showStudentProfile('${email}')" style="width: 100%; padding: 10px; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85em; letter-spacing: 0.5px;">PROFILE</button>
                    <button onclick="window.showMarksheet('${email}')" style="width: 100%; padding: 10px; background: #f5576c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85em; letter-spacing: 0.5px;">MARKSHEET</button>
                </div>
            `;
            list.appendChild(card);
        });
    };


    // ─────────────────────────────────────────────────────────────────────
    //  createMarksheetSection — single vertical table layout
    //  OT rows → OT summary → NT rows → NT summary → Combined avg row
    // ─────────────────────────────────────────────────────────────────────
    function createMarksheetSection() {
        const section = document.createElement('div');
        section.id = 'marksheetSection';
        section.style.cssText = 'padding:10px;background:#f8f9fa;display:none;';

        section.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <button onclick="window.backToDashboardFromMarksheet()" style="padding:8px 16px;background:#6c757d;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;">⬅️ BACK</button>
                <button id="downloadBtn" onclick="window.downloadMarksheet()" style="padding:8px 16px;background:#27ae60;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;">📥 DOWNLOAD PDF</button>
            </div>

            <div id="marksheet-to-print" style="background:white;width:100%;padding:12px 16px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);font-family:sans-serif;font-size:11px;box-sizing:border-box;">

                <!-- COLLEGE HEADER -->
                <div style="text-align:center;margin-bottom:5px;border-bottom:2px solid #1e3c72;padding-bottom:4px;">
                    <div style="font-size:15px;font-weight:900;color:#1e3c72;text-transform:uppercase;line-height:1.2;font-family:'Arial Black',sans-serif;">BIBLE COLLEGE OF INDIA PASTORS FOUNDATION</div>
                    <div style="font-size:9px;color:#555;font-weight:600;margin-top:1px;">(AFFILIATED TO JESUS LOVES INDIA CHURCH FOUNDATION)</div>
                </div>

                <!-- ORANGE BANNER -->
                <div style="background:linear-gradient(135deg,#ff9800,#ff5722);color:white;padding:4px 10px;text-align:center;border-radius:5px;margin-bottom:5px;">
                    <div id="rank-badge-container"></div>
                    <div style="font-size:9px;font-weight:900;text-transform:uppercase;">CERTIFICATE IN THEOLOGY (C.T.H) 2025 EXAM RESULT &nbsp;|&nbsp; Academic Performance</div>
                    <div id="marksheet-student-name" style="font-size:11px;font-weight:bold;margin-top:1px;"></div>
                    <div id="marksheet-student-email-display" style="font-size:8px;opacity:0.85;"></div>
                </div>

                <!-- SUMMARY CARDS: Total /12, OT%, NT%, Combined% -->
                <table style="width:100%;border-collapse:separate;border-spacing:4px;margin-bottom:6px;">
                    <tr>
                        <td style="background:#f8f0ff;border-left:4px solid #9c27b0;padding:4px 6px;border-radius:4px;text-align:center;">
                            <div style="font-size:8px;font-weight:bold;color:#666;">TOTAL ONLINE EXAMS</div>
                            <div id="online-exams-taken" style="font-size:13px;font-weight:bold;color:#9c27b0;">0/12</div>
                            <div style="font-size:7px;color:#999;">(OT:7 + NT:5)</div>
                        </td>
                        <td style="background:#eef2fc;border-left:4px solid #1e3c72;padding:4px 6px;border-radius:4px;text-align:center;">
                            <div style="font-size:8px;font-weight:bold;color:#666;">OLD TESTAMENT %</div>
                            <div id="final-percentage-score" style="font-size:13px;font-weight:bold;color:#1e3c72;">0%</div>
                        </td>
                        <td style="background:#e8f4fd;border-left:4px solid #2196f3;padding:4px 6px;border-radius:4px;text-align:center;">
                            <div style="font-size:8px;font-weight:bold;color:#666;">NEW TESTAMENT %</div>
                            <div id="nt-percentage-score" style="font-size:13px;font-weight:bold;color:#2196f3;">Pending</div>
                        </td>
                        <td style="background:#edfbf0;border-left:4px solid #4caf50;padding:4px 6px;border-radius:4px;text-align:center;">
                            <div style="font-size:8px;font-weight:bold;color:#666;">COMBINED % &amp; GRADE</div>
                            <div id="combined-percentage-score" style="font-size:13px;font-weight:bold;color:#4caf50;">Pending</div>
                            <div id="final-grade-display" style="font-size:10px;font-weight:bold;color:#f44336;">-</div>
                        </td>
                    </tr>
                </table>

                <!-- SINGLE MAIN TABLE — OT then NT then Combined -->
                <table style="width:100%;border-collapse:collapse;margin-bottom:6px;">
                    <thead>
                        <tr style="background:#2c3e50;color:white;">
                            <th style="padding:4px 6px;border:1px solid #bbb;font-size:9px;text-align:left;width:38%;">Exam</th>
                            <th style="padding:4px 6px;border:1px solid #bbb;font-size:9px;width:14%;">Marks</th>
                            <th style="padding:4px 6px;border:1px solid #bbb;font-size:9px;width:12%;">Out of</th>
                            <th style="padding:4px 6px;border:1px solid #bbb;font-size:9px;width:13%;">%</th>
                            <th style="padding:4px 6px;border:1px solid #bbb;font-size:9px;width:23%;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="main-table-body"></tbody>
                </table>

                <!-- SIGNATURES -->
                <table style="width:100%;border-collapse:collapse;margin-top:5px;">
                    <tr>
                        <td style="text-align:center;width:50%;padding-top:4px;">
                            <img src="sign with stamp.png" style="width:70px;height:auto;display:block;margin:0 auto 2px auto;">
                            <div style="width:120px;height:1px;background:#1e3c72;margin:0 auto 2px auto;"></div>
                            <div style="font-size:9px;font-weight:bold;color:#1e3c72;">Prabha Sadanand Amolik</div>
                            <div style="font-size:8px;color:#666;">DIRECTOR</div>
                        </td>
                        <td style="text-align:center;width:50%;padding-top:4px;">
                            <img src="DIGITAL STAMP.jpeg" style="width:70px;height:auto;display:block;margin:0 auto 2px auto;">
                            <div style="width:120px;height:1px;background:#1e3c72;margin:0 auto 2px auto;"></div>
                            <div style="font-size:9px;font-weight:bold;color:#1e3c72;">Sadanand Shamrao Amolik</div>
                            <div style="font-size:8px;color:#666;">DIRECTOR</div>
                        </td>
                    </tr>
                </table>

            </div>
        `;
        return section;
    }

    // ─────────────────────────────────────────────────────────────────────
    //  populateMarksheet — single table: OT rows, NT rows, combined row
    // ─────────────────────────────────────────────────────────────────────
    function populateMarksheet(studentMarksData, studentProfileData, email) {
        const p  = 'padding:3px 5px;border:1px solid #ccc;font-size:9px;';
        const pc = 'padding:3px 5px;border:1px solid #ccc;font-size:9px;text-align:center;';

        const tableBody = document.getElementById('main-table-body');
        tableBody.innerHTML = '';

        // ── OT DATA ──────────────────────────────────────────────────────
        const otMarks       = studentMarksData.marks;           // 7 entries
        const otOffline     = studentMarksData.offlineMark;
        const otLabels      = STUDENT_DATA.examMonths;          // 7 labels

        let otTotal = 0, otTaken = 0;

        // OT section header row
        const otHeader = document.createElement('tr');
        otHeader.innerHTML = `<td colspan="5" style="padding:4px 6px;background:#1e3c72;color:white;font-size:9px;font-weight:900;letter-spacing:0.5px;">📖 OLD TESTAMENT (7 Online Exams)</td>`;
        tableBody.appendChild(otHeader);

        // OT exam rows
        otMarks.forEach((mark, i) => {
            if (mark !== null && typeof mark === 'number') { otTotal += mark; otTaken++; }
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="${p}font-weight:600;">${otLabels[i]}</td>
                <td style="${pc}font-variant-numeric:lining-nums;">${mark !== null ? mark : 'Absent'}</td>
                <td style="${pc}">100</td>
                <td style="${pc}font-variant-numeric:lining-nums;">${mark !== null ? mark + '%' : '-'}</td>
                <td style="${pc}font-weight:600;">${getStatus(mark)}</td>
            `;
            tableBody.appendChild(tr);
        });

        // OT calculations
        const otAvg      = (otTotal / 700) * 100;
        const otW20      = otAvg * 0.20;
        const otOff      = (otOffline !== null && typeof otOffline === 'number') ? otOffline : 0;
        const otW80      = otOff * 0.80;
        const otFinal    = parseFloat((otW20 + otW80).toFixed(2));

        // OT summary rows
        appendSummaryBlock(tableBody, otTotal, 700, otAvg, otOff, otW20, otW80, otFinal, false, '#f5f5f5', '#eef2f7', '#fff3cd', 'OT Final Result', p, pc);

        // ── NT DATA ──────────────────────────────────────────────────────
        const ntData    = STUDENT_DATA.ntMarks ? STUDENT_DATA.ntMarks[email] : null;
        const ntMarks   = ntData ? ntData.marks : [null,null,null,null,null]; // 5 entries
        const ntOffline = ntData ? ntData.offlineMark : null;
        const ntLabels  = STUDENT_DATA.ntExamMonths;            // 5 labels

        let ntTotal = 0, ntTaken = 0;
        const ntHasData = ntMarks.some(m => m !== null) || ntOffline !== null;

        // NT section header row
        const ntHeader = document.createElement('tr');
        ntHeader.innerHTML = `<td colspan="5" style="padding:4px 6px;background:#2196f3;color:white;font-size:9px;font-weight:900;letter-spacing:0.5px;">📘 NEW TESTAMENT (5 Online Exams)</td>`;
        tableBody.appendChild(ntHeader);

        // NT exam rows
        ntMarks.forEach((mark, i) => {
            if (mark !== null && typeof mark === 'number') { ntTotal += mark; ntTaken++; }
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="${p}font-weight:600;">${ntLabels[i]}</td>
                <td style="${pc}font-variant-numeric:lining-nums;">${mark !== null ? mark : 'Pending'}</td>
                <td style="${pc}">100</td>
                <td style="${pc}font-variant-numeric:lining-nums;">${mark !== null ? mark + '%' : '-'}</td>
                <td style="${pc}font-weight:600;">${getStatus(mark)}</td>
            `;
            tableBody.appendChild(tr);
        });

        // NT calculations
        const ntAvg   = (ntTotal / 500) * 100;
        const ntW20   = ntAvg * 0.20;
        const ntOff   = (ntOffline !== null && typeof ntOffline === 'number') ? ntOffline : 0;
        const ntW80   = ntOff * 0.80;
        const ntFinal = parseFloat((ntW20 + ntW80).toFixed(2));

        appendSummaryBlock(tableBody, ntTotal, 500, ntAvg, ntOff, ntW20, ntW80, ntFinal, !ntHasData, '#f0f7ff', '#e8f4fd', '#e3f2fd', 'NT Final Result', p, pc);

        // ── COMBINED FINAL ROW ───────────────────────────────────────────
        const ntReady    = ntHasData && ntOffline !== null;
        const combined   = ntReady ? parseFloat(((otFinal + ntFinal) / 2).toFixed(2)) : null;

        const combRow = document.createElement('tr');
        combRow.style.background = '#1e3c72';
        combRow.innerHTML = `
            <td style="padding:5px 6px;border:1px solid #1e3c72;font-size:9px;font-weight:900;color:#fff;">
                🏆 Combined Final Result
                <span style="font-size:8px;font-weight:400;opacity:0.85;display:block;">(OT% + NT%) ÷ 2</span>
            </td>
            <td style="padding:5px 6px;border:1px solid #1e3c72;font-size:9px;text-align:center;font-weight:900;color:#fff;">${combined !== null ? combined : 'NT Pending'}</td>
            <td style="padding:5px 6px;border:1px solid #1e3c72;font-size:9px;text-align:center;font-weight:900;color:#fff;">100</td>
            <td style="padding:5px 6px;border:1px solid #1e3c72;font-size:9px;text-align:center;font-weight:900;color:#ffd700;">${combined !== null ? combined + '%' : '-'}</td>
            <td style="padding:5px 6px;border:1px solid #1e3c72;font-size:9px;text-align:center;font-weight:900;color:#ffd700;">${combined !== null ? calculateGrade(combined) : 'NT Pending'}</td>
        `;
        tableBody.appendChild(combRow);

        // ── RANKING ──────────────────────────────────────────────────────
        const allScores = Object.keys(STUDENT_DATA.marks).map(e => {
            const m   = STUDENT_DATA.marks[e];
            const avg = (m.marks.reduce((a, b) => (typeof b === 'number' ? a + b : a), 0) / 700) * 100;
            const off = (typeof m.offlineMark === 'number') ? m.offlineMark : 0;
            return parseFloat(((avg * 0.20) + (off * 0.80)).toFixed(2));
        }).sort((a, b) => b - a);

        const rank = allScores.indexOf(otFinal) + 1;
        const rankContainer = document.getElementById('rank-badge-container');
        rankContainer.innerHTML = '';
        if (rank > 0 && rank <= 5) {
            const badge = document.createElement('div');
            badge.style.cssText = `
                background:#ffd700;color:#000;padding:0 10px;border-radius:20px;
                font-weight:900;display:inline-flex;align-items:center;
                height:16px;line-height:1;margin-bottom:2px;
                border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.2);
                font-size:8px;text-transform:uppercase;
                font-family:'Segoe UI',Roboto,Arial,sans-serif;
            `;
            badge.innerHTML = `🏆 TOP <span style="margin:0 3px;">${rank}</span> RANK`;
            rankContainer.appendChild(badge);
        }

        // ── UPDATE SUMMARY CARDS ─────────────────────────────────────────
        document.getElementById('marksheet-student-name').textContent    = studentProfileData?.name || email;
        document.getElementById('marksheet-student-email-display').textContent = email;
        // Total exams = OT taken + NT taken, out of 12
        document.getElementById('online-exams-taken').textContent = `${otTaken + ntTaken}/12`;

        document.getElementById('final-percentage-score').textContent  = otFinal + '%';
        document.getElementById('nt-percentage-score').textContent     = ntHasData ? ntFinal + '%' : 'Pending';
        document.getElementById('combined-percentage-score').textContent = combined !== null ? combined + '%' : 'Pending';
        document.getElementById('final-grade-display').textContent     = combined !== null ? calculateGrade(combined) : '-';
    }

    // ─────────────────────────────────────────────────────────────────────
    //  appendSummaryBlock — adds 5 summary rows to a single shared table
    // ─────────────────────────────────────────────────────────────────────
    function appendSummaryBlock(tbody, total, possible, avg, offline, w20, w80, finalPer, isPending, bg1, bg2, bg3, label, p, pc) {
        const rows = [
            { bg: bg1, cells: [`Total Online (${possible})`, total, possible, avg.toFixed(2)+'%', getStatus(avg)] },
            { bg: bg1, cells: ['Offline Exam (%)', isPending?'Pending':offline, 100, isPending?'-':offline+'%', isPending?'Pending':getStatus(offline)] },
            { bg: bg2, cells: ['20% of Online Avg', w20.toFixed(2), 20, '-', getStatus(avg)] },
            { bg: bg2, cells: ['80% of Offline Exam', isPending?'Pending':w80.toFixed(2), 80, '-', isPending?'Pending':getStatus(offline)] },
            { bg: bg3, cells: [label, isPending?'Pending':finalPer.toFixed(2), 100, isPending?'Pending':finalPer+'%', isPending?'Pending':calculateGrade(finalPer)], bold: true }
        ];
        rows.forEach(({ bg, cells, bold }) => {
            const tr = document.createElement('tr');
            tr.style.background = bg;
            tr.innerHTML = cells.map((c, i) => {
                const style = i === 0 ? `${p}font-weight:${bold?'900':'bold'};color:${bold?'#856404':'inherit'};` : `${pc}font-weight:${bold?'900':'normal'};font-variant-numeric:lining-nums;`;
                return `<td style="${style}">${c}</td>`;
            }).join('');
            tbody.appendChild(tr);
        });
    }

    // ─────────────────────────────────────────────────────────────────────
    //  Helpers
    // ─────────────────────────────────────────────────────────────────────
    function calculateGrade(percentage) {
        if (percentage === null || isNaN(percentage)) return 'N/A';
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C';
        return 'Needs Improvement';
    }

    function getStatus(mark) {
        if (mark === null || mark === undefined || isNaN(mark)) return 'N/A';
        const num = parseFloat(mark);
        if (num >= 90) return 'Excellent';
        if (num >= 80) return 'Good';
        if (num >= 70) return 'Average';
        if (num >= 50) return 'Below Average';
        return 'Needs Improvement';
    }

})();
